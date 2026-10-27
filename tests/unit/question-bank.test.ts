import { describe, it, expect } from "vitest";
import {
  getAllQuestions,
  bankStats,
  selectQuestions,
  filterQuestions,
} from "@/data/questions";

describe("question bank", () => {
  const all = getAllQuestions();

  it("has unique ids", () => {
    const ids = all.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has valid answers and four options", () => {
    for (const q of all) {
      expect(["A", "B", "C", "D"]).toContain(q.correctAnswer);
      expect(q.options.A && q.options.B && q.options.C && q.options.D).toBeTruthy();
      expect(q.explanation.length).toBeGreaterThan(5);
      expect(q.year).toBeGreaterThanOrEqual(2020);
      expect(q.year).toBeLessThanOrEqual(2026);
    }
  });

  it("reports stats", () => {
    const stats = bankStats();
    expect(stats.total).toBe(all.length);
    expect(stats.total).toBeGreaterThan(0);
  });

  it("selects without exceeding pool", () => {
    const { questions, shortage } = selectQuestions({
      subjects: ["mathematics"],
      count: 5,
      yearFrom: 2020,
      yearTo: 2026,
    });
    expect(questions.length).toBe(5);
    expect(new Set(questions.map((q) => q.id)).size).toBe(5);
    expect(shortage).toBeNull();
  });

  it("filters by origin", () => {
    const official = filterQuestions({ origin: "official_past_question" });
    const practice = filterQuestions({ origin: "original_practice" });
    expect(official.length).toBe(0);
    expect(practice.length).toBe(all.length);
  });
});
