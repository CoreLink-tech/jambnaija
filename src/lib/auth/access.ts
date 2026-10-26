/**
 * Port of the legacy resolveUserAccess business rules.
 * Do not change trial duration or entitlement logic without approval.
 */

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export type AccountStatus = "PENDING" | "ACTIVE" | "DEACTIVATED";
export type PlanTier = "STANDARD" | "PREMIUM";
export type Role = "STUDENT" | "ADMIN";

export interface AccessUser {
  status?: string | null;
  planTier?: string | null;
  trialPremiumEndsAt?: Date | string | number | null;
  role?: string | null;
}

export interface AccessResult {
  canAccess: boolean;
  effectiveTier: PlanTier | null;
  source: "trial" | "plan" | "admin" | "deactivated" | "activation_required";
  trialActive: boolean;
  trialEndsAt: string | null;
  status: string;
}

export function createTrialPremiumEndsAt(from: Date = new Date()): Date {
  return new Date(from.getTime() + THREE_DAYS_MS);
}

export function resolveUserAccess(
  user: AccessUser,
  now: Date = new Date(),
): AccessResult {
  const status = String(user?.status || "PENDING").toUpperCase();
  const planTierRaw = user?.planTier
    ? String(user.planTier).toUpperCase()
    : null;
  const trialEndsAt = user?.trialPremiumEndsAt
    ? new Date(user.trialPremiumEndsAt as string | number | Date)
    : null;
  const hasValidTrial =
    trialEndsAt instanceof Date &&
    !Number.isNaN(trialEndsAt.getTime()) &&
    trialEndsAt.getTime() > now.getTime();

  if (status === "DEACTIVATED") {
    return {
      canAccess: false,
      effectiveTier: null,
      source: "deactivated",
      trialActive: false,
      trialEndsAt: trialEndsAt ? trialEndsAt.toISOString() : null,
      status,
    };
  }

  if (hasValidTrial) {
    return {
      canAccess: true,
      effectiveTier: "PREMIUM",
      source: "trial",
      trialActive: true,
      trialEndsAt: trialEndsAt!.toISOString(),
      status,
    };
  }

  if (
    status === "ACTIVE" &&
    (planTierRaw === "STANDARD" || planTierRaw === "PREMIUM")
  ) {
    return {
      canAccess: true,
      effectiveTier: planTierRaw as PlanTier,
      source: "plan",
      trialActive: false,
      trialEndsAt: trialEndsAt ? trialEndsAt.toISOString() : null,
      status,
    };
  }

  if (status === "ACTIVE") {
    return {
      canAccess: true,
      effectiveTier: "STANDARD",
      source: "admin",
      trialActive: false,
      trialEndsAt: trialEndsAt ? trialEndsAt.toISOString() : null,
      status,
    };
  }

  return {
    canAccess: false,
    effectiveTier: null,
    source: "activation_required",
    trialActive: false,
    trialEndsAt: trialEndsAt ? trialEndsAt.toISOString() : null,
    status,
  };
}

export function isPremiumAccess(access: AccessResult): boolean {
  return access.canAccess && access.effectiveTier === "PREMIUM";
}

export function isStandardOrBetter(access: AccessResult): boolean {
  return (
    access.canAccess &&
    (access.effectiveTier === "STANDARD" || access.effectiveTier === "PREMIUM")
  );
}
