import { z } from "zod";
import { requireAdminSession } from "@/server/policies/auth";
import { createActivationCode } from "@/lib/security/id";
import { ValidationError, NotFoundError, AppError } from "@/lib/errors";
import * as adminRepo from "@/server/repositories/admin";
import { getDb, users } from "@/lib/db";
import { eq } from "drizzle-orm";
import { creditReferrerOnFirstActivation } from "@/server/services/activation";

export async function getAdminStats() {
  await requireAdminSession();
  return adminRepo.adminStats();
}

export async function adminListUsers(raw: {
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  await requireAdminSession();
  const page = Math.max(1, raw.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, raw.pageSize ?? 50));
  const result = await adminRepo.listUsers({
    search: raw.search,
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
  return { ...result, page, pageSize };
}

const userStateSchema = z.object({
  action: z.enum(["activate", "deactivate", "set_standard", "set_premium"]),
});

export async function adminUpdateUser(id: string, raw: unknown) {
  await requireAdminSession();
  const parsed = userStateSchema.safeParse(raw);
  if (!parsed.success) {
    throw new ValidationError("Invalid user action.", parsed.error.flatten());
  }

  const db = getDb();
  const beforeRows = await db.select().from(users).where(eq(users.id, id)).limit(1);
  const before = beforeRows[0];
  if (!before) throw new NotFoundError("User not found.");

  let patch: {
    status?: "PENDING" | "ACTIVE" | "DEACTIVATED";
    planTier?: "STANDARD" | "PREMIUM" | null;
    trialPremiumEndsAt?: Date | null;
  } = {};

  switch (parsed.data.action) {
    case "activate":
      // Admin activation without tier → STANDARD so access + referral rules apply
      patch = {
        status: "ACTIVE",
        planTier: before.planTier ?? "STANDARD",
        trialPremiumEndsAt: null,
      };
      break;
    case "deactivate":
      patch = { status: "DEACTIVATED" };
      break;
    case "set_standard":
      patch = { status: "ACTIVE", planTier: "STANDARD", trialPremiumEndsAt: null };
      break;
    case "set_premium":
      patch = { status: "ACTIVE", planTier: "PREMIUM", trialPremiumEndsAt: null };
      break;
  }

  // Pay referrer on first paid/active plan assignment
  if (
    parsed.data.action === "activate" ||
    parsed.data.action === "set_standard" ||
    parsed.data.action === "set_premium"
  ) {
    await creditReferrerOnFirstActivation({
      id: before.id,
      referredById: before.referredById,
      status: before.status,
      planTier: before.planTier,
    });
  }

  const user = await adminRepo.updateUserState(id, patch);
  if (!user) throw new NotFoundError("User not found.");
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    status: user.status,
    planTier: user.planTier,
  };
}

export async function adminDeleteUser(id: string) {
  const session = await requireAdminSession();
  if (session.user.id === id) {
    throw new AppError("You cannot delete your own account.", "SELF_DELETE", 400);
  }
  await adminRepo.deleteUser(id);
  return { ok: true };
}

const codeGenSchema = z.object({
  tier: z.enum(["STANDARD", "PREMIUM"]),
  count: z.number().int().min(1).max(50).default(1),
});

export async function adminGenerateCodes(raw: unknown) {
  const session = await requireAdminSession();
  const parsed = codeGenSchema.safeParse(raw);
  if (!parsed.success) {
    throw new ValidationError("Invalid code request.", parsed.error.flatten());
  }
  const codes = Array.from({ length: parsed.data.count }, () =>
    createActivationCode(),
  );
  await adminRepo.createActivationCodes({
    codes,
    tier: parsed.data.tier,
    createdById: session.user.id,
  });
  return { codes, tier: parsed.data.tier };
}

export async function adminListCodes() {
  await requireAdminSession();
  const rows = await adminRepo.listActivationCodes(100);
  return rows.map((r) => ({
    id: r.id,
    code: r.code,
    tier: r.tier,
    isActive: r.isActive,
    usedById: r.usedById,
    usedAt: r.usedAt,
    createdAt: r.createdAt,
  }));
}
