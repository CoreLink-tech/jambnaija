import { and, eq, isNull } from "drizzle-orm";
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
import { sql } from "drizzle-orm";

const redeemSchema = z.object({
  code: activationCodeSchema,
});

/**
 * Redeem an activation code for the currently authenticated student.
 * Marks code used, sets user ACTIVE + plan tier.
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

  const codeValue = parsed.data.code;
  const db = getDb();

  const codeRows = await db
    .select()
    .from(activationCodes)
    .where(eq(activationCodes.code, codeValue))
    .limit(1);

  const code = codeRows[0];
  if (!code || !code.isActive || code.usedById) {
    // Generic message — do not reveal whether code exists
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

  // Attempt conditional update to reduce double-redeem races
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
        eq(activationCodes.isActive, true),
        isNull(activationCodes.usedById),
      ),
    );

  // Verify the code is now owned by this user
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

  await db
    .update(users)
    .set({
      status: "ACTIVE",
      planTier: code.tier,
      updatedAt: now,
    })
    .where(eq(users.id, user.id));

  if (user.referredById) {
    const refRows = await db
      .select({ walletBalance: users.walletBalance })
      .from(users)
      .where(eq(users.id, user.referredById))
      .limit(1);
    const bal = refRows[0]?.walletBalance ?? 0;
    await db
      .update(users)
      .set({
        walletBalance: bal + REFERRAL_REWARD_NGN,
        updatedAt: now,
      })
      .where(eq(users.id, user.referredById));
  }

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
