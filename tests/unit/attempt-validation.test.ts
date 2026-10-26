import { describe, it, expect } from "vitest";
import {
  startCbtSchema,
  saveAnswersSchema,
  submitCbtSchema,
} from "@/lib/validation/attempts";

describe("attempt validation", () => {
  it("accepts valid CBT start", () => {
    const result = startCbtSchema.safeParse({
      subjectId: "sub_1",
      year: 2023,
      durationMinutes: 60,
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid year", () => {
    const result = startCbtSchema.safeParse({
      subjectId: "sub_1",
      year: 1900,
    });
    expect(result.success).toBe(false);
  });

  it("accepts save payload", () => {
    const result = saveAnswersSchema.safeParse({
      attemptId: "att_1",
      answers: [{ questionId: "q1", selectedIndex: 2 }],
    });
    expect(result.success).toBe(true);
  });

  it("accepts submit without answers (uses saved)", () => {
    const result = submitCbtSchema.safeParse({ attemptId: "att_1" });
    expect(result.success).toBe(true);
  });
});
