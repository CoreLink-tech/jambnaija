const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export function createTrialPremiumEndsAt(from = new Date()) {
  const base = from instanceof Date ? from.getTime() : Date.now();
  return new Date(base + THREE_DAYS_MS);
}

export function resolveUserAccess(user, now = new Date()) {
  const status = String(user?.status || "PENDING").toUpperCase();
  const planTierRaw = user?.planTier ? String(user.planTier).toUpperCase() : null;
  const trialEndsAt = user?.trialPremiumEndsAt ? new Date(user.trialPremiumEndsAt) : null;
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
      trialEndsAt: trialEndsAt.toISOString(),
      status,
    };
  }

  if (status === "ACTIVE" && (planTierRaw === "STANDARD" || planTierRaw === "PREMIUM")) {
    return {
      canAccess: true,
      effectiveTier: planTierRaw,
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
