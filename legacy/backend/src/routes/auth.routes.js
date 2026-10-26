import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { hashPassword, signToken, verifyPassword } from "../lib/auth.js";
import { requireAuth } from "../middleware/require-auth.js";
import { createTrialPremiumEndsAt, resolveUserAccess } from "../lib/access.js";

const router = Router();

const emailSchema = z.string().trim().toLowerCase().email();
const passwordSchema = z.string().min(6);
const usernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9._-]{3,30}$/i, "Username must be 3-30 chars (letters, numbers, ., _, -).");
const deviceIdSchema = z.string().trim().min(8).max(128);
const activationCodeSchema = z.string().trim().toLowerCase().min(10).max(80);

const authPayloadSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const studentRegisterSchema = authPayloadSchema.extend({
  username: usernameSchema,
  deviceId: deviceIdSchema,
});

const loginPayloadSchema = authPayloadSchema.extend({
  deviceId: deviceIdSchema.optional(),
});

const activationPayloadSchema = authPayloadSchema.extend({
  code: activationCodeSchema,
  deviceId: deviceIdSchema,
});
const activationSelfPayloadSchema = z.object({
  code: activationCodeSchema,
  referralCode: z.string().trim().max(80).optional(),
  deviceId: deviceIdSchema.optional(),
});

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

const authUserSelect = {
  id: true,
  email: true,
  role: true,
  passwordHash: true,
  createdAt: true,
  ...(supportsUsername ? { username: true } : {}),
  ...(supportsAccountAccess ? { status: true, planTier: true, trialPremiumEndsAt: true } : {}),
  ...(supportsDeviceBinding ? { deviceId: true } : {}),
};

function serializeUser(user) {
  if (!user) return null;
  if (user.role !== "STUDENT") {
    return {
      id: user.id,
      email: user.email,
      username: supportsUsername ? (user.username || null) : null,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  if (!supportsAccountAccess) {
    return {
      id: user.id,
      email: user.email,
      username: supportsUsername ? (user.username || null) : null,
      role: user.role,
      status: "ACTIVE",
      planTier: "PREMIUM",
      effectiveTier: "PREMIUM",
      accessSource: "legacy",
      trialPremiumEndsAt: null,
      trialActive: false,
      createdAt: user.createdAt,
    };
  }

  const access = resolveUserAccess(user);
  return {
    id: user.id,
    email: user.email,
    username: supportsUsername ? (user.username || null) : null,
    role: user.role,
    status: user.status,
    planTier: user.planTier || null,
    effectiveTier: access.effectiveTier,
    accessSource: access.source,
    trialPremiumEndsAt: access.trialEndsAt,
    trialActive: access.trialActive,
    createdAt: user.createdAt,
  };
}

function activationBlockedResponse(user) {
  const access = resolveUserAccess(user);
  if (access.status === "DEACTIVATED") {
    return {
      status: 403,
      message: "Account is deactivated. Contact admin support.",
      needsActivation: false,
      access,
    };
  }

  return {
    status: 403,
    message: "Account locked. Redeem a valid activation code to continue.",
    needsActivation: true,
    access,
  };
}

async function redeemActivationCodeForStudent(user, codeValue, deviceId) {
  if (user.status === "DEACTIVATED") {
    const error = new Error("Account is deactivated. Contact admin support.");
    error.name = "ActivationForbiddenError";
    throw error;
  }

  if (user.deviceId && deviceId && user.deviceId !== deviceId) {
    const error = new Error("This account can only be used on the original device.");
    error.name = "ActivationForbiddenError";
    throw error;
  }

  const code = await prisma.activationCode.findUnique({
    where: { code: codeValue },
    select: { id: true, code: true, tier: true, isActive: true, usedById: true },
  });

  if (!code || !code.isActive || code.usedById) {
    const error = new Error("Invalid activation code.");
    error.name = "ActivationCodeError";
    throw error;
  }

  const now = new Date();
  return prisma.$transaction(async (tx) => {
    const freshCode = await tx.activationCode.findUnique({
      where: { id: code.id },
      select: { id: true, tier: true, isActive: true, usedById: true },
    });

    if (!freshCode || !freshCode.isActive || freshCode.usedById) {
      const error = new Error("Invalid activation code.");
      error.name = "ActivationCodeError";
      throw error;
    }

    const updated = await tx.user.update({
      where: { id: user.id },
      data: {
        status: "ACTIVE",
        planTier: freshCode.tier,
        deviceId: user.deviceId || deviceId || null,
      },
      select: authUserSelect,
    });

    await tx.activationCode.update({
      where: { id: freshCode.id },
      data: {
        isActive: false,
        usedById: user.id,
        usedAt: now,
      },
    });

    return updated;
  });
}

router.post("/register/student", async (req, res, next) => {
  try {
    const payload = studentRegisterSchema.parse(req.body);

    const existing = await prisma.user.findUnique({
      where: { email: payload.email },
      select: { id: true, role: true },
    });

    if (existing) {
      return res.status(409).json({ message: "Email already exists." });
    }

    if (supportsUsername) {
      const existingUsername = await prisma.user.findFirst({
        where: {
          username: {
            equals: payload.username,
            mode: "insensitive",
          },
        },
        select: { id: true },
      });
      if (existingUsername) {
        return res.status(409).json({ message: "Username already exists." });
      }
    }

    if (supportsDeviceBinding) {
      const existingDevice = await prisma.user.findFirst({
        where: {
          role: "STUDENT",
          deviceId: payload.deviceId,
        },
        select: { id: true, email: true },
      });
      if (existingDevice) {
        return res.status(409).json({ message: "This device already has a registered account." });
      }
    }

    const passwordHash = await hashPassword(payload.password);
    const createData = {
      email: payload.email,
      passwordHash,
      role: "STUDENT",
      ...(supportsUsername ? { username: payload.username } : {}),
      ...(supportsAccountAccess ? { status: "PENDING", planTier: null, trialPremiumEndsAt: createTrialPremiumEndsAt() } : {}),
      ...(supportsDeviceBinding ? { deviceId: payload.deviceId } : {}),
    };
    const user = await prisma.user.create({
      data: createData,
      select: authUserSelect,
    });

    const safeUser = serializeUser(user);
    return res.status(201).json({
      message: supportsActivationSystem
        ? "Student account created. You have 3 days of premium trial access."
        : "Student account created. Activation features will be available after Prisma migration.",
      user: safeUser,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid payload.", issues: error.flatten() });
    }
    return next(error);
  }
});

router.post("/bootstrap-admin", async (req, res, next) => {
  try {
    const configuredKey = process.env.ADMIN_BOOTSTRAP_KEY;
    if (!configuredKey) {
      return res.status(403).json({ message: "Admin bootstrap is disabled." });
    }

    const key = req.headers["x-bootstrap-key"];
    if (key !== configuredKey) {
      return res.status(403).json({ message: "Invalid bootstrap key." });
    }

    const payload = authPayloadSchema.parse(req.body);

    const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
    if (adminCount > 0) {
      return res.status(409).json({ message: "Admin already exists. Use normal login." });
    }

    const passwordHash = await hashPassword(payload.password);
    const user = await prisma.user.create({
      data: {
        email: payload.email,
        passwordHash,
        role: "ADMIN",
        ...(supportsAccountAccess ? { status: "ACTIVE" } : {}),
      },
      select: authUserSelect,
    });

    const token = signToken({
      sub: user.id,
      role: user.role,
      email: user.email,
    });

    return res.status(201).json({
      message: "Admin account created.",
      token,
      user: serializeUser(user),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid payload.", issues: error.flatten() });
    }
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const payload = loginPayloadSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      select: authUserSelect,
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const valid = await verifyPassword(payload.password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    let activeUser = user;
    let studentAccess = null;
    if (user.role === "STUDENT") {
      if (supportsDeviceBinding && !payload.deviceId) {
        return res.status(400).json({ message: "Device ID is required for student login." });
      }

      if (supportsDeviceBinding && user.deviceId && user.deviceId !== payload.deviceId) {
        return res.status(403).json({ message: "This account can only be used on the original device." });
      }

      if (supportsDeviceBinding && !user.deviceId) {
        activeUser = await prisma.user.update({
          where: { id: user.id },
          data: { deviceId: payload.deviceId },
          select: authUserSelect,
        });
      }

      if (supportsAccountAccess) {
        studentAccess = resolveUserAccess(activeUser);
        if (studentAccess.status === "DEACTIVATED") {
          const blocked = activationBlockedResponse(activeUser);
          return res.status(blocked.status).json({
            message: blocked.message,
            needsActivation: blocked.needsActivation,
            access: blocked.access,
          });
        }
      }
    }

    const token = signToken({
      sub: activeUser.id,
      role: activeUser.role,
      email: activeUser.email,
    });

    return res.json({
      ...(user.role === "STUDENT" && supportsAccountAccess && studentAccess && !studentAccess.canAccess
        ? {
            needsActivation: true,
            message: "Account locked. Redeem a valid activation code to continue.",
            access: studentAccess,
          }
        : {}),
      token,
      user: serializeUser(activeUser),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid payload.", issues: error.flatten() });
    }
    return next(error);
  }
});

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: authUserSelect,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json({ user: serializeUser(user) });
  } catch (error) {
    return next(error);
  }
});

router.post("/activate/me", requireAuth, async (req, res, next) => {
  try {
    if (!supportsActivationSystem) {
      return res.status(503).json({
        message: "Activation system is not ready. Run Prisma migrate and Prisma generate on the backend first.",
      });
    }

    const payload = activationSelfPayloadSchema.parse(req.body || {});
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: authUserSelect,
    });

    if (!user || user.role !== "STUDENT") {
      return res.status(403).json({ message: "Student access required." });
    }

    let activatedUser;
    try {
      activatedUser = await redeemActivationCodeForStudent(user, payload.code, payload.deviceId || user.deviceId || null);
    } catch (error) {
      if (error && error.name === "ActivationCodeError") {
        return res.status(400).json({ message: "Invalid activation code." });
      }
      if (error && error.name === "ActivationForbiddenError") {
        return res.status(403).json({ message: error.message });
      }
      throw error;
    }

    const access = resolveUserAccess(activatedUser);
    if (!access.canAccess) {
      return res.status(403).json({ message: "Account could not be activated." });
    }

    const token = signToken({
      sub: activatedUser.id,
      role: activatedUser.role,
      email: activatedUser.email,
    });

    return res.json({
      message: "Activation successful.",
      token,
      user: serializeUser(activatedUser),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid payload.", issues: error.flatten() });
    }
    return next(error);
  }
});

router.post("/activate", async (req, res, next) => {
  try {
    if (!supportsActivationSystem) {
      return res.status(503).json({
        message: "Activation system is not ready. Run Prisma migrate and Prisma generate on the backend first.",
      });
    }

    const payload = activationPayloadSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      select: authUserSelect,
    });

    if (!user || user.role !== "STUDENT") {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const valid = await verifyPassword(payload.password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    let activatedUser;
    try {
      activatedUser = await redeemActivationCodeForStudent(user, payload.code, payload.deviceId);
    } catch (error) {
      if (error && error.name === "ActivationCodeError") {
        return res.status(400).json({ message: "Invalid activation code." });
      }
      if (error && error.name === "ActivationForbiddenError") {
        return res.status(403).json({ message: error.message });
      }
      throw error;
    }

    const access = resolveUserAccess(activatedUser);
    if (!access.canAccess) {
      return res.status(403).json({ message: "Account could not be activated." });
    }

    const token = signToken({
      sub: activatedUser.id,
      role: activatedUser.role,
      email: activatedUser.email,
    });

    return res.json({
      message: "Activation successful.",
      token,
      user: serializeUser(activatedUser),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid payload.", issues: error.flatten() });
    }
    return next(error);
  }
});

export default router;
