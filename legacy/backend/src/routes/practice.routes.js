import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/require-auth.js";
import { randomPick } from "../utils/questions.js";
import { resolveUserAccess } from "../lib/access.js";

const router = Router();

const runtimeModels = prisma?._runtimeDataModel?.models || {};
const runtimeUserFieldNames = new Set(
  Array.isArray(runtimeModels.User?.fields)
    ? runtimeModels.User.fields.map((field) => field?.name).filter(Boolean)
    : Object.keys(runtimeModels.User?.fields || {})
);
const hasUserField = (fieldName) => runtimeUserFieldNames.has(fieldName);
const supportsAccountAccess = hasUserField("status") && hasUserField("planTier") && hasUserField("trialPremiumEndsAt");

const payloadSchema = z.object({
  subjectId: z.string().trim().min(1),
  mode: z.enum(["STUDY", "CBT"]),
  topicId: z.string().trim().optional(),
  topic: z.string().trim().optional(),
  year: z.number().int().min(1980).max(2100).optional(),
  exam: z.string().trim().optional(),
  count: z.number().int().min(1).max(200).optional(),
});

router.post("/session", requireAuth, async (req, res, next) => {
  try {
    const payload = payloadSchema.parse(req.body);
    const take = payload.count || 20;
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        role: true,
        ...(supportsAccountAccess ? { status: true, planTier: true, trialPremiumEndsAt: true } : {}),
      },
    });

    if (!user || user.role !== "STUDENT") {
      return res.status(403).json({ message: "Student access required." });
    }

    if (supportsAccountAccess) {
      const access = resolveUserAccess(user);
      if (!access.canAccess) {
        return res.status(403).json({ message: "Account locked. Activate your account to continue." });
      }

      if (payload.mode === "STUDY" && access.effectiveTier !== "PREMIUM") {
        return res.status(403).json({ message: "Study mode is available only on premium access." });
      }
    }

    const where = {
      subjectId: payload.subjectId,
      mode: payload.mode,
    };

    if (payload.mode === "STUDY") {
      if (payload.topicId) {
        where.topicId = payload.topicId;
      } else if (payload.topic) {
        where.topic = {
          name: {
            equals: payload.topic,
            mode: "insensitive",
          },
        };
      }
    }

    if (payload.mode === "CBT") {
      if (payload.year) {
        where.year = payload.year;
      }
      if (payload.exam) {
        where.exam = {
          equals: payload.exam,
          mode: "insensitive",
        };
      }
    }

    const questions = await prisma.question.findMany({
      where,
      include: {
        topic: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const selected = randomPick(questions, take).map((question) => ({
      id: question.id,
      mode: question.mode,
      prompt: question.prompt,
      options: question.options,
      answerIndex: question.answerIndex,
      explanation: question.explanation,
      year: question.year,
      exam: question.exam,
      topic: question.topic ? { id: question.topic.id, name: question.topic.name } : null,
    }));

    return res.json({
      count: selected.length,
      questions: selected,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid payload.", issues: error.flatten() });
    }
    return next(error);
  }
});

export default router;
