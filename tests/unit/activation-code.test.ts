import { describe, it, expect } from "vitest";
import { activationCodeSchema } from "@/lib/validation/auth";

describe("activation code validation", () => {
  it("accepts normalized codes", () => {
    const result = activationCodeSchema.safeParse("  ABCD1234EFGH5678  ");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe("abcd1234efgh5678");
    }
  });

  it("rejects short codes", () => {
    const result = activationCodeSchema.safeParse("short");
    expect(result.success).toBe(false);
  });
});
