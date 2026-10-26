import { describe, it, expect } from "vitest";
import { scoreAnswers, subjectQuestionCap } from "@/lib/cbt/scoring";

describe("CBT scoring", () => {
  it("scores correct answers only", () => {
    const result = scoreAnswers([
      { correctIndex: 1, selectedIndex: 1 },
      { correctIndex: 0, selectedIndex: 2 },
      { correctIndex: 3, selectedIndex: null },
    ]);
    expect(result.score).toBe(1);
    expect(result.total).toBe(3);
    expect(result.percent).toBe(33);
  });

  it("handles empty set", () => {
    expect(scoreAnswers([])).toEqual({ score: 0, total: 0, percent: 0 });
  });

  it("scores full marks", () => {
    const result = scoreAnswers([
      { correctIndex: 0, selectedIndex: 0 },
      { correctIndex: 2, selectedIndex: 2 },
    ]);
    expect(result).toEqual({ score: 2, total: 2, percent: 100 });
  });
});

describe("subjectQuestionCap", () => {
  it("caps English at 60", () => {
    expect(subjectQuestionCap("English Language")).toBe(60);
  });

  it("caps other subjects at 40", () => {
    expect(subjectQuestionCap("Biology")).toBe(40);
    expect(subjectQuestionCap("Mathematics")).toBe(40);
  });
});
