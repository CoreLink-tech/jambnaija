import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("database client foundation", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv, NODE_ENV: "test", USE_MEMORY_DB: "1" };
  });

  afterEach(() => {
    process.env = originalEnv;
    // Dynamic import cache may retain module state; tests stay lightweight.
  });

  it("can construct an in-memory client when USE_MEMORY_DB=1", async () => {
    const { getDb, resetDbCache } = await import("@/lib/db");
    resetDbCache();
    const db = getDb();
    expect(db).toBeDefined();
    // Simple smoke: schema is attached
    expect(typeof db.select).toBe("function");
    expect(typeof db.insert).toBe("function");
  });
});
