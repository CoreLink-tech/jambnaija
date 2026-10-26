/**
 * Pure scoring helpers — safe to unit test without a database.
 */

export function scoreAnswers(
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

export function subjectQuestionCap(subjectName: string): number {
  return subjectName.toLowerCase().includes("english") ? 60 : 40;
}
