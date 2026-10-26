import { and, eq, like, sql, desc, count } from "drizzle-orm";
import { getDb, questions } from "@/lib/db";
import type { QuestionListQuery } from "@/lib/validation/questions";

export type QuestionRow = typeof questions.$inferSelect;

/** Public shape without answer key (for active CBT). */
export function toPublicQuestion(row: QuestionRow) {
  return {
    id: row.id,
    subjectId: row.subjectId,
    topicId: row.topicId,
    mode: row.mode,
    prompt: row.prompt,
    options: row.options,
    year: row.year,
    exam: row.exam,
    contentId: row.contentId,
  };
}

/** Study / review shape includes explanation and correct index. */
export function toStudyQuestion(row: QuestionRow) {
  return {
    ...toPublicQuestion(row),
    answerIndex: row.answerIndex,
    explanation: row.explanation,
  };
}

export async function listQuestions(query: QuestionListQuery) {
  const db = getDb();
  const conditions = [];

  if (query.subjectId) conditions.push(eq(questions.subjectId, query.subjectId));
  if (query.mode) conditions.push(eq(questions.mode, query.mode));
  if (query.topicId) conditions.push(eq(questions.topicId, query.topicId));
  if (query.year != null) conditions.push(eq(questions.year, query.year));
  if (query.search) {
    conditions.push(like(questions.prompt, `%${query.search}%`));
  }
  conditions.push(eq(questions.published, true));

  const whereClause = conditions.length ? and(...conditions) : undefined;
  const offset = (query.page - 1) * query.pageSize;

  const [rows, totalRows] = await Promise.all([
    db
      .select()
      .from(questions)
      .where(whereClause)
      .orderBy(desc(questions.createdAt))
      .limit(query.pageSize)
      .offset(offset),
    db
      .select({ value: count() })
      .from(questions)
      .where(whereClause),
  ]);

  return {
    items: rows,
    total: Number(totalRows[0]?.value ?? 0),
    page: query.page,
    pageSize: query.pageSize,
  };
}

export async function getQuestionById(id: string) {
  const db = getDb();
  const rows = await db.select().from(questions).where(eq(questions.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createQuestion(data: {
  id: string;
  subjectId: string;
  topicId?: string | null;
  mode: "STUDY" | "CBT";
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation?: string | null;
  year?: number | null;
  exam?: string | null;
  contentId?: string | null;
  source?: string | null;
  published?: boolean;
}) {
  const db = getDb();
  await db.insert(questions).values({
    id: data.id,
    subjectId: data.subjectId,
    topicId: data.topicId ?? null,
    mode: data.mode,
    prompt: data.prompt,
    options: data.options,
    answerIndex: data.answerIndex,
    explanation: data.explanation ?? null,
    year: data.year ?? null,
    exam: data.exam ?? null,
    contentId: data.contentId ?? null,
    source: data.source ?? "admin",
    published: data.published ?? true,
  });
  return getQuestionById(data.id);
}

export async function deleteQuestion(id: string) {
  const db = getDb();
  await db.delete(questions).where(eq(questions.id, id));
}

export async function deleteQuestionsByMode(mode: "STUDY" | "CBT") {
  const db = getDb();
  await db.delete(questions).where(eq(questions.mode, mode));
}

/**
 * Select a random sample of questions for a practice/CBT session.
 * Returns full rows; caller decides whether to strip answer keys.
 */
export async function pickQuestions(options: {
  subjectId: string;
  mode: "STUDY" | "CBT";
  topicId?: string;
  year?: number;
  count: number;
}) {
  const db = getDb();
  const conditions = [
    eq(questions.subjectId, options.subjectId),
    eq(questions.mode, options.mode),
    eq(questions.published, true),
  ];
  if (options.topicId) conditions.push(eq(questions.topicId, options.topicId));
  if (options.year != null) conditions.push(eq(questions.year, options.year));

  // SQLite random order
  const rows = await db
    .select()
    .from(questions)
    .where(and(...conditions))
    .orderBy(sql`random()`)
    .limit(options.count);

  return rows;
}

export async function listPastSets(subjectId: string) {
  const db = getDb();
  const rows = await db
    .select({
      year: questions.year,
      exam: questions.exam,
      count: count(),
    })
    .from(questions)
    .where(
      and(
        eq(questions.subjectId, subjectId),
        eq(questions.mode, "CBT"),
        eq(questions.published, true),
      ),
    )
    .groupBy(questions.year, questions.exam);

  return rows
    .filter((r) => r.year != null)
    .map((r) => ({
      year: r.year as number,
      exam: r.exam || "JAMB",
      count: Number(r.count) || 0,
    }))
    .sort((a, b) => b.year - a.year);
}
