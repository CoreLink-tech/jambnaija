import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("environment validation foundation", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("accepts a minimal development environment", async () => {
    process.env.NODE_ENV = "development";
    // Dynamic import to pick up env changes if module is re-evaluated
    const { getServerEnv } = await import("@/lib/configuration/env");
    const env = getServerEnv();
    expect(env.NODE_ENV).toBe("development");
  });
});
