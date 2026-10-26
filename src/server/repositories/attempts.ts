import { and, eq, desc } from "drizzle-orm";
import { getDb, attempts, attemptAnswers } from "@/lib/db";

export async function createAttempt(data: {
  id: string;
  userId: string;
  subjectId: string;
  mode: "STUDY" | "CBT";
  focusLabel?: string | null;
  score: number;
  total: number;
  percent: number;
  deadlineAt?: Date | null;
  status?: "IN_PROGRESS" | "SUBMITTED" | "ABANDONED" | "EXPIRED";
}) {
  const db = getDb();
  await db.insert(attempts).values({
    id: data.id,
    userId: data.userId,
    subjectId: data.subjectId,
    mode: data.mode,
    focusLabel: data.focusLabel ?? null,
    score: data.score,
    total: data.total,
    percent: data.percent,
    deadlineAt: data.deadlineAt ?? null,
    status: data.status ?? "IN_PROGRESS",
  });
  return getAttemptById(data.id);
}

export async function getAttemptById(id: string) {
  const db = getDb();
  const rows = await db.select().from(attempts).where(eq(attempts.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function findInProgressCbt(userId: string, subjectId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(attempts)
    .where(
      and(
        eq(attempts.userId, userId),
        eq(attempts.subjectId, subjectId),
        eq(attempts.mode, "CBT"),
        eq(attempts.status, "IN_PROGRESS"),
      ),
    )
    .orderBy(desc(attempts.createdAt))
    .limit(1);
  return rows[0] ?? null;
}

export async function listAttemptsForUser(userId: string, limit = 20) {
  const db = getDb();
  return db
    .select()
    .from(attempts)
    .where(eq(attempts.userId, userId))
    .orderBy(desc(attempts.createdAt))
    .limit(limit);
}

export async function insertAttemptAnswers(
  rows: {
    attemptId: string;
    questionId: string | null;
    promptSnapshot: string;
    optionsSnapshot: string[];
    correctIndex: number;
    selectedIndex: number | null;
    isCorrect: boolean | null;
    orderIndex: number;
  }[],
) {
  if (!rows.length) return;
  const db = getDb();
  await db.insert(attemptAnswers).values(rows);
}

export async function replaceAttemptAnswers(
  attemptId: string,
  rows: {
    attemptId: string;
    questionId: string | null;
    promptSnapshot: string;
    optionsSnapshot: string[];
    correctIndex: number;
    selectedIndex: number | null;
    isCorrect: boolean | null;
    orderIndex: number;
  }[],
) {
  const db = getDb();
  await db.delete(attemptAnswers).where(eq(attemptAnswers.attemptId, attemptId));
  if (rows.length) {
    await db.insert(attemptAnswers).values(rows);
  }
}

export async function listAnswersForAttempt(attemptId: string) {
  const db = getDb();
  return db
    .select()
    .from(attemptAnswers)
    .where(eq(attemptAnswers.attemptId, attemptId))
    .orderBy(attemptAnswers.orderIndex);
}

export async function finalizeAttempt(
  id: string,
  data: {
    score: number;
    total: number;
    percent: number;
    status: "SUBMITTED" | "EXPIRED";
    submittedAt: Date;
  },
) {
  const db = getDb();
  await db
    .update(attempts)
    .set({
      score: data.score,
      total: data.total,
      percent: data.percent,
      status: data.status,
      submittedAt: data.submittedAt,
    })
    .where(eq(attempts.id, id));
  return getAttemptById(id);
}
