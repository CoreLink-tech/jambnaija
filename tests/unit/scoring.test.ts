import { describe, it, expect } from "vitest";

function scoreAnswers(
  items: { correctIndex: number; selectedIndex: number | null }[],
): { score: number; total: number; percent: number } {
  const total = items.length;
  let score = 0;
  for (const item of items) {
    if (
      item.selectedIndex != null &&
      item.selectedIndex === item.correctIndex
    ) {
      score += 1;
    }
  }
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  return { score, total, percent };
}

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
});
