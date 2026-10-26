import { describe, it, expect } from "vitest";
import {
  resolveUserAccess,
  createTrialPremiumEndsAt,
  isPremiumAccess,
} from "@/lib/auth/access";

describe("resolveUserAccess", () => {
  it("grants premium during active trial", () => {
    const trialEnds = createTrialPremiumEndsAt();
    const access = resolveUserAccess({
      status: "PENDING",
      planTier: null,
      trialPremiumEndsAt: trialEnds,
    });
    expect(access.canAccess).toBe(true);
    expect(access.effectiveTier).toBe("PREMIUM");
    expect(access.source).toBe("trial");
    expect(access.trialActive).toBe(true);
    expect(isPremiumAccess(access)).toBe(true);
  });

  it("denies deactivated accounts even with trial", () => {
    const access = resolveUserAccess({
      status: "DEACTIVATED",
      planTier: "PREMIUM",
      trialPremiumEndsAt: createTrialPremiumEndsAt(),
    });
    expect(access.canAccess).toBe(false);
    expect(access.source).toBe("deactivated");
  });

  it("uses plan tier when active and no trial", () => {
    const access = resolveUserAccess({
      status: "ACTIVE",
      planTier: "STANDARD",
      trialPremiumEndsAt: null,
    });
    expect(access.canAccess).toBe(true);
    expect(access.effectiveTier).toBe("STANDARD");
    expect(access.source).toBe("plan");
  });

  it("requires activation when pending and trial expired", () => {
    const past = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
    const access = resolveUserAccess({
      status: "PENDING",
      planTier: null,
      trialPremiumEndsAt: past,
    });
    expect(access.canAccess).toBe(false);
    expect(access.source).toBe("activation_required");
  });
});
