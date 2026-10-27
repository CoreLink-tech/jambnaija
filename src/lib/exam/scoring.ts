import type { AnswerKey } from "@/data/questions/types";

export function scoreExam(
  items: { correctAnswer: AnswerKey; selected: AnswerKey | null }[],
) {
  const total = items.length;
  let correct = 0;
  let unanswered = 0;
  for (const item of items) {
    if (item.selected == null) {
      unanswered += 1;
      continue;
    }
    if (item.selected === item.correctAnswer) correct += 1;
  }
  const incorrect = total - correct - unanswered;
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  return { total, correct, incorrect, unanswered, percent };
}

export function minutesForQuestionCount(count: number): number {
  // ~1.5 minutes per question, min 10, max 180
  return Math.min(180, Math.max(10, Math.round(count * 1.5)));
}
