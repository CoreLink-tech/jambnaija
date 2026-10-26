import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/require-auth.js";
import { requireAdmin } from "../middleware/require-admin.js";
import { ensureOptions } from "../utils/questions.js";
import { resolveUserAccess } from "../lib/access.js";

const router = Router();

router.use(requireAuth, requireAdmin);

const runtimeModels = prisma?._runtimeDataModel?.models || {};
const runtimeUserFieldNames = new Set(
  Array.isArray(runtimeModels.User?.fields)
    ? runtimeModels.User.fields.map((field) => field?.name).filter(Boolean)
    : Object.keys(runtimeModels.User?.fields || {})
);
const hasUserField = (fieldName) => runtimeUserFieldNames.has(fieldName);
const supportsUsername = hasUserField("username");
const supportsDeviceBinding = hasUserField("deviceId");
const supportsAccountAccess = hasUserField("status") && hasUserField("planTier") && hasUserField("trialPremiumEndsAt");
const supportsActivationSystem = supportsAccountAccess && supportsDeviceBinding && !!runtimeModels.ActivationCode;

const subjectSchema = z.object({
  name: z.string().trim().min(2),
  description: z.string().trim().min(1),
});

const topicSchema = z.object({
  subjectId: z.string().trim().min(1),
  name: z.string().trim().min(1),
});

const bulkTopicSchema = z.object({
  subjectId: z.string().trim().min(1),
  topics: z.array(z.string().trim().min(1)).min(1).max(1000),
});

const baseQuestionSchema = z.object({
  subjectId: z.string().trim().min(1),
  topicId: z.string().trim().optional(),
  topicName: z.string().trim().optional(),
  question: z.string().trim().min(5),
  options: z.array(z.string()).min(2),
  answerIndex: z.number().int().min(0),
});

const studyQuestionSchema = baseQuestionSchema.extend({
  explanation: z.string().trim().optional(),
});

const cbtQuestionSchema = baseQuestionSchema.extend({
  year: z.number().int().min(1980).max(2100),
  exam: z.string().trim().min(1).default("JAMB"),
});

const activationTierSchema = z.enum(["STANDARD", "PREMIUM"]);

const activationCodeGenerateSchema = z.object({
  tier: activationTierSchema,
  count: z.number().int().min(1).max(200).default(1),
});

const updateUserStateSchema = z.object({
  action: z.enum(["activate", "deactivate"]),
  tier: activationTierSchema.optional(),
});

const userSearchQuerySchema = z.object({
  query: z.string().trim().optional(),
  limit: z.coerce.number().int().min(1).max(200).optional(),
});

const ACTIVATION_CODE_BASE = 22200000;

function formatActivationCode(id, tier) {
  const marker = tier === "PREMIUM" ? "prm" : "std";
  const serial = String(ACTIVATION_CODE_BASE + Number(id || 0));
  return `activate-${marker}-${serial}`.toLowerCase();
}

function serializeStudentForAdmin(user) {
  const access = supportsAccountAccess
    ? resolveUserAccess(user)
    : {
        effectiveTier: "PREMIUM",
        source: "legacy",
        trialActive: false,
        trialEndsAt: null,
        canAccess: true,
      };
  return {
    id: user.id,
    email: user.email,
    username: supportsUsername ? (user.username || null) : null,
    role: user.role,
    status: supportsAccountAccess ? user.status : "ACTIVE",
    planTier: supportsAccountAccess ? (user.planTier || null) : "PREMIUM",
    effectiveTier: access.effectiveTier,
    accessSource: access.source,
    trialActive: access.trialActive,
    trialPremiumEndsAt: access.trialEndsAt,
    canAccess: access.canAccess,
    deviceId: supportsDeviceBinding ? (user.deviceId || null) : null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

async function createActivationCode(createdById, tier) {
  const tempCode = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const created = await prisma.activationCode.create({
    data: {
      code: tempCode,
      tier,
      createdById,
      isActive: true,
    },
    select: {
      id: true,
      code: true,
      tier: true,
      isActive: true,
      createdAt: true,
      usedAt: true,
      usedById: true,
    },
  });

  const code = formatActivationCode(created.id, tier);
  return prisma.activationCode.update({
    where: { id: created.id },
    data: { code },
    select: {
      id: true,
      code: true,
      tier: true,
      isActive: true,
      createdAt: true,
      usedAt: true,
      usedById: true,
    },
  });
}

async function resolveTopic(subjectId, topicId, topicName) {
  if (topicId) {
    const existingById = await prisma.topic.findFirst({
      where: { id: topicId, subjectId },
      select: { id: true, name: true },
    });
    if (!existingById) return null;
    return existingById;
  }

  if (topicName) {
    const name = topicName.trim();
    const existingByName = await prisma.topic.findFirst({
      where: {
        subjectId,
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
      select: { id: true, name: true },
    });

    if (existingByName) return existingByName;

    const created = await prisma.topic.create({
      data: { subjectId, name },
      select: { id: true, name: true },
    });
    return created;
  }

  return null;
}

async function createStudyQuestion(payload) {
  const parsed = studyQuestionSchema.parse(payload);
  const options = ensureOptions(parsed.options);
  if (!options) {
    throw new Error("Study question options are invalid.");
  }
  if (parsed.answerIndex >= options.length) {
    throw new Error("answerIndex is out of range.");
  }

  const subject = await prisma.subject.findUnique({
    where: { id: parsed.subjectId },
    select: { id: true },
  });
  if (!subject) throw new Error("Subject not found.");

  const topic = await resolveTopic(parsed.subjectId, parsed.topicId, parsed.topicName);
  if (!topic) throw new Error("Study topic is required.");

  return prisma.question.create({
    data: {
      subjectId: parsed.subjectId,
      topicId: topic.id,
      mode: "STUDY",
      prompt: parsed.question,
      options,
      answerIndex: parsed.answerIndex,
      explanation: parsed.explanation || null,
      exam: null,
      year: null,
    },
  });
}

async function createCbtQuestion(payload) {
  const parsed = cbtQuestionSchema.parse(payload);
  const options = ensureOptions(parsed.options);
  if (!options) {
    throw new Error("CBT question options are invalid.");
  }
  if (parsed.answerIndex >= options.length) {
    throw new Error("answerIndex is out of range.");
  }

  const subject = await prisma.subject.findUnique({
    where: { id: parsed.subjectId },
    select: { id: true },
  });
  if (!subject) throw new Error("Subject not found.");

  const topic = await resolveTopic(parsed.subjectId, parsed.topicId, parsed.topicName);

  return prisma.question.create({
    data: {
      subjectId: parsed.subjectId,
      topicId: topic ? topic.id : null,
      mode: "CBT",
      prompt: parsed.question,
      options,
      answerIndex: parsed.answerIndex,
      explanation: null,
      exam: parsed.exam,
      year: parsed.year,
    },
  });
}

router.post("/subjects", async (req, res, next) => {
  try {
    const payload = subjectSchema.parse(req.body);
    const subject = await prisma.subject.create({
      data: {
        name: payload.name,
        description: payload.description,
      },
    });
    return res.status(201).json({ subject });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid payload.", issues: error.flatten() });
    }
    return next(error);
  }
});

router.post("/subjects/bulk", async (req, res, next) => {
  try {
    const input = Array.isArray(req.body?.subjects)
      ? req.body.subjects
      : Array.isArray(req.body)
      ? req.body
      : [req.body];

    let addedSubjects = 0;
    let skipped = 0;

    for (const rawSubject of input) {
      const subject = subjectSchema.safeParse(rawSubject);
      if (!subject.success) {
        skipped += 1;
        continue;
      }

      let createdSubject;
      try {
        createdSubject = await prisma.subject.create({
          data: {
            name: subject.data.name,
            description: subject.data.description,
          },
        });
        addedSubjects += 1;
      } catch (error) {
        skipped += 1;
        continue;
      }
    }

    return res.status(201).json({
      message: "Bulk subject creation completed.",
      stats: { addedSubjects, skipped },
    });
  } catch (error) {
    return next(error);
  }
});

router.delete("/subjects/:id", async (req, res, next) => {
  try {
    await prisma.subject.delete({
      where: { id: req.params.id },
    });
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

router.post("/topics", async (req, res, next) => {
  try {
    const payload = topicSchema.parse(req.body);
    const topic = await resolveTopic(payload.subjectId, undefined, payload.name);
    if (!topic) {
      return res.status(404).json({ message: "Subject not found." });
    }
    return res.status(201).json({ topic });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid payload.", issues: error.flatten() });
    }
    return next(error);
  }
});

router.post("/topics/bulk", async (req, res, next) => {
  try {
    const payload = bulkTopicSchema.parse(req.body || {});
    const subject = await prisma.subject.findUnique({
      where: { id: payload.subjectId },
      select: { id: true },
    });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found." });
    }

    const existingTopics = await prisma.topic.findMany({
      where: { subjectId: payload.subjectId },
      select: { name: true },
    });
    const seen = new Set(existingTopics.map((topic) => String(topic.name || "").trim().toLowerCase()));
    let added = 0;
    let skipped = 0;
    const topics = [];

    for (const rawName of payload.topics) {
      const name = String(rawName || "").trim();
      if (!name) {
        skipped += 1;
        continue;
      }
      const key = name.toLowerCase();
      if (seen.has(key)) {
        skipped += 1;
        continue;
      }
      // eslint-disable-next-line no-await-in-loop
      const created = await prisma.topic.create({
        data: {
          subjectId: payload.subjectId,
          name,
        },
        select: {
          id: true,
          name: true,
        },
      });
      seen.add(key);
      topics.push(created);
      added += 1;
    }

    return res.status(201).json({
      message: "Bulk topic import completed.",
      stats: { added, skipped },
      topics,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid payload.", issues: error.flatten() });
    }
    return next(error);
  }
});

router.post("/questions/study", async (req, res, next) => {
  try {
    const question = await createStudyQuestion(req.body);
    return res.status(201).json({ question });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid payload.", issues: error.flatten() });
    }
    return res.status(400).json({ message: error.message || "Could not create study question." });
  }
});

router.post("/questions/cbt", async (req, res, next) => {
  try {
    const question = await createCbtQuestion(req.body);
    return res.status(201).json({ question });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid payload.", issues: error.flatten() });
    }
    return res.status(400).json({ message: error.message || "Could not create CBT question." });
  }
});

router.post("/questions/bulk/study", async (req, res, next) => {
  try {
    const subjectId = String(req.body?.subjectId || "");
    const questions = Array.isArray(req.body?.questions) ? req.body.questions : [];
    if (!subjectId || !questions.length) {
      return res.status(400).json({ message: "subjectId and questions[] are required." });
    }

    let added = 0;
    let skipped = 0;
    const ids = [];
    const errors = [];
    for (let index = 0; index < questions.length; index += 1) {
      const question = questions[index];
      try {
        const created = await createStudyQuestion({ ...question, subjectId });
        added += 1;
        ids.push(created.id);
      } catch (error) {
        skipped += 1;
        const message = error instanceof z.ZodError
          ? "Invalid study row payload."
          : (error?.message || "Could not create study question.");
        errors.push({ index, message });
      }
    }

    return res.status(201).json({
      message: "Bulk study import completed.",
      stats: { added, skipped },
      ids,
      errors,
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/questions/bulk/cbt", async (req, res, next) => {
  try {
    const subjectId = String(req.body?.subjectId || "");
    const questions = Array.isArray(req.body?.questions) ? req.body.questions : [];
    if (!subjectId || !questions.length) {
      return res.status(400).json({ message: "subjectId and questions[] are required." });
    }

    let added = 0;
    let skipped = 0;
    const ids = [];
    const errors = [];
    for (let index = 0; index < questions.length; index += 1) {
      const question = questions[index];
      try {
        const created = await createCbtQuestion({ ...question, subjectId });
        added += 1;
        ids.push(created.id);
      } catch (error) {
        skipped += 1;
        const message = error instanceof z.ZodError
          ? "Invalid CBT row payload."
          : (error?.message || "Could not create CBT question.");
        errors.push({ index, message });
      }
    }

    return res.status(201).json({
      message: "Bulk CBT import completed.",
      stats: { added, skipped },
      ids,
      errors,
    });
  } catch (error) {
    return next(error);
  }
});

router.delete("/topics", async (_req, res, next) => {
  try {
    const result = await prisma.topic.deleteMany({});
    return res.json({
      message: "All topics deleted.",
      deleted: result.count,
    });
  } catch (error) {
    return next(error);
  }
});

router.delete("/questions", async (req, res, next) => {
  try {
    const modeRaw = String(req.body?.mode || "").trim().toUpperCase();
    const mode = modeRaw === "STUDY" || modeRaw === "CBT" ? modeRaw : null;
    const ids = Array.isArray(req.body?.ids)
      ? req.body.ids.map((id) => String(id || "").trim()).filter(Boolean)
      : [];

    if (!mode && !ids.length) {
      return res.status(400).json({ message: "Provide mode or ids to delete questions." });
    }

    const where = {};
    if (mode) where.mode = mode;
    if (ids.length) where.id = { in: ids };

    const result = await prisma.question.deleteMany({ where });
    return res.json({
      message: "Questions deleted.",
      deleted: result.count,
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/activation-codes", async (req, res, next) => {
  try {
    if (!supportsActivationSystem) {
      return res.status(503).json({
        message: "Activation code system is not ready. Run Prisma migrate and Prisma generate first.",
      });
    }
    const payload = activationCodeGenerateSchema.parse(req.body || {});
    const codes = [];
    for (let index = 0; index < payload.count; index += 1) {
      // eslint-disable-next-line no-await-in-loop
      const code = await createActivationCode(req.user.id, payload.tier);
      codes.push(code);
    }

    return res.status(201).json({
      message: `${codes.length} activation code(s) generated.`,
      codes,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid payload.", issues: error.flatten() });
    }
    return next(error);
  }
});

router.get("/activation-codes", async (req, res, next) => {
  try {
    if (!supportsActivationSystem) {
      return res.status(503).json({
        message: "Activation code system is not ready. Run Prisma migrate and Prisma generate first.",
      });
    }
    const limitRaw = Number(req.query.limit || 50);
    const limit = Number.isInteger(limitRaw) ? Math.max(1, Math.min(limitRaw, 200)) : 50;
    const codes = await prisma.activationCode.findMany({
      orderBy: { id: "desc" },
      take: limit,
      select: {
        id: true,
        code: true,
        tier: true,
        isActive: true,
        createdAt: true,
        usedAt: true,
        usedBy: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
      },
    });

    return res.json({ codes });
  } catch (error) {
    return next(error);
  }
});

router.get("/users", async (req, res, next) => {
  try {
    const parsed = userSearchQuerySchema.parse({
      query: req.query.query,
      limit: req.query.limit,
    });
    const query = String(parsed.query || "").trim();
    const where = { role: "STUDENT" };
    if (query) {
      const clauses = [
        {
          email: {
            contains: query,
            mode: "insensitive",
          },
        },
      ];
      if (supportsUsername) {
        clauses.push({
          username: {
            contains: query,
            mode: "insensitive",
          },
        });
      }
      where.OR = clauses;
    }

    const take = parsed.limit || (query ? undefined : 10);
    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      ...(take ? { take } : {}),
      select: {
        id: true,
        email: true,
        role: true,
        ...(supportsUsername ? { username: true } : {}),
        ...(supportsAccountAccess ? { status: true, planTier: true, trialPremiumEndsAt: true } : {}),
        ...(supportsDeviceBinding ? { deviceId: true } : {}),
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.json({
      users: users.map(serializeStudentForAdmin),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid query.", issues: error.flatten() });
    }
    return next(error);
  }
});

router.patch("/users/:id/state", async (req, res, next) => {
  try {
    if (!supportsAccountAccess) {
      return res.status(503).json({
        message: "User access controls are not ready. Run Prisma migrate and Prisma generate first.",
      });
    }
    const payload = updateUserStateSchema.parse(req.body || {});
    const existing = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        role: true,
        planTier: true,
      },
    });

    if (!existing || existing.role !== "STUDENT") {
      return res.status(404).json({ message: "Student user not found." });
    }

    let data;
    if (payload.action === "deactivate") {
      data = { status: "DEACTIVATED" };
    } else {
      data = {
        status: "ACTIVE",
        planTier: payload.tier || existing.planTier || "STANDARD",
      };
    }

    const user = await prisma.user.update({
      where: { id: existing.id },
      data,
      select: {
        id: true,
        email: true,
        ...(supportsUsername ? { username: true } : {}),
        role: true,
        status: true,
        planTier: true,
        trialPremiumEndsAt: true,
        ...(supportsDeviceBinding ? { deviceId: true } : {}),
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.json({
      message: payload.action === "deactivate" ? "Account deactivated." : "Account activated.",
      user: serializeStudentForAdmin(user),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid payload.", issues: error.flatten() });
    }
    return next(error);
  }
});

router.delete("/users/:id", async (req, res, next) => {
  try {
    const existing = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: { id: true, role: true },
    });

    if (!existing) {
      return res.status(404).json({ message: "User not found." });
    }
    if (existing.role !== "STUDENT") {
      return res.status(400).json({ message: "Admin users cannot be deleted here." });
    }

    await prisma.user.delete({
      where: { id: existing.id },
    });
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

export default router;
