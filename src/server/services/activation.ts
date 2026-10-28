import { and, eq, isNull, or } from "drizzle-orm";
import { z } from "zod";
import { getDb, activationCodes, users } from "@/lib/db";
import { requireSession } from "@/server/policies/auth";
import {
  AppError,
  ForbiddenError,
  ValidationError,
} from "@/lib/errors";
import { resolveUserAccess } from "@/lib/auth/access";
import { activationCodeSchema, REFERRAL_REWARD_NGN } from "@/lib/validation/auth";

const redeemSchema = z.object({
  code: activationCodeSchema,
});

/**
 * Credit the referrer once when a referred user first gets a paid/active plan.
 * Skips if the user was already ACTIVE with STANDARD or PREMIUM.
 */
export async function creditReferrerOnFirstActivation(user: {
  id: string;
  referredById: string | null;
  status: string | null;
  planTier: string | null;
}) {
  if (!user.referredById) return { credited: false, reason: "no_referrer" as const };

  const alreadyPaid =
    String(user.status).toUpperCase() === "ACTIVE" &&
    (String(user.planTier || "").toUpperCase() === "STANDARD" ||
      String(user.planTier || "").toUpperCase() === "PREMIUM");

  if (alreadyPaid) {
    return { credited: false, reason: "already_activated" as const };
  }

  const db = getDb();
  const refRows = await db
    .select({ id: users.id, walletBalance: users.walletBalance })
    .from(users)
    .where(eq(users.id, user.referredById))
    .limit(1);

  if (!refRows[0]) {
    return { credited: false, reason: "referrer_missing" as const };
  }

  const bal = refRows[0].walletBalance ?? 0;
  const now = new Date();
  await db
    .update(users)
    .set({
      walletBalance: bal + REFERRAL_REWARD_NGN,
      updatedAt: now,
    })
    .where(eq(users.id, user.referredById));

  return { credited: true, reason: "ok" as const, amount: REFERRAL_REWARD_NGN };
}

/**
 * Redeem an activation code for the currently authenticated student.
 * Marks code used, sets user ACTIVE + plan tier, credits referrer once.
 */
export async function redeemActivationCode(raw: unknown) {
  const session = await requireSession();
  if (session.user.role !== "STUDENT") {
    throw new ForbiddenError("Only students can redeem activation codes.");
  }

  const parsed = redeemSchema.safeParse(raw);
  if (!parsed.success) {
    throw new ValidationError("Invalid activation code.", parsed.error.flatten());
  }

  // Always compare uppercase — codes are stored uppercase
  const codeValue = parsed.data.code.trim().toUpperCase();
  const db = getDb();

  // Match uppercase (canonical) or lowercase legacy rows
  const codeRows = await db
    .select()
    .from(activationCodes)
    .where(
      or(
        eq(activationCodes.code, codeValue),
        eq(activationCodes.code, codeValue.toLowerCase()),
      ),
    )
    .limit(1);

  const code = codeRows[0];
  const inactive =
    !code ||
    Boolean(code.usedById) ||
    code.isActive === false ||
    // sqlite drivers sometimes surface boolean integers
    (code.isActive as unknown) === 0;

  if (inactive) {
    throw new AppError("Invalid or already used activation code.", "INVALID_CODE", 400);
  }

  const userRows = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);
  const user = userRows[0];
  if (!user) {
    throw new AppError("User not found.", "USER_MISSING", 404);
  }
  if (user.status === "DEACTIVATED") {
    throw new ForbiddenError("This account has been deactivated.");
  }

  const now = new Date();
  await db
    .update(activationCodes)
    .set({
      usedById: user.id,
      usedAt: now,
      isActive: false,
    })
    .where(
      and(
        eq(activationCodes.id, code.id),
        isNull(activationCodes.usedById),
      ),
    );

  const verify = await db
    .select()
    .from(activationCodes)
    .where(eq(activationCodes.id, code.id))
    .limit(1);
  if (!verify[0] || verify[0].usedById !== user.id) {
    throw new AppError(
      "This code was just redeemed by another account. Try a different code.",
      "CODE_RACE",
      409,
    );
  }

  // Credit referrer BEFORE flipping status so "already activated" check works
  await creditReferrerOnFirstActivation({
    id: user.id,
    referredById: user.referredById,
    status: user.status,
    planTier: user.planTier,
  });

  await db
    .update(users)
    .set({
      status: "ACTIVE",
      planTier: code.tier,
      updatedAt: now,
    })
    .where(eq(users.id, user.id));

  const updated = {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    status: "ACTIVE" as const,
    planTier: code.tier,
    trialPremiumEndsAt: user.trialPremiumEndsAt,
  };

  return {
    message: "Activation successful.",
    user: {
      ...updated,
      access: resolveUserAccess(updated),
    },
  };
}
