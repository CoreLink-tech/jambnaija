import { eq, sql, desc } from "drizzle-orm";
import { getDb, subjects, topics, questions } from "@/lib/db";

export async function listSubjectsWithCounts() {
  const db = getDb();
  const rows = await db
    .select({
      id: subjects.id,
      name: subjects.name,
      description: subjects.description,
      createdAt: subjects.createdAt,
      updatedAt: subjects.updatedAt,
      topicCount: sql<number>`(select count(*) from topics where topics.subject_id = ${subjects.id})`,
      studyCount: sql<number>`(select count(*) from questions where questions.subject_id = ${subjects.id} and questions.mode = 'STUDY' and questions.published = 1)`,
      cbtCount: sql<number>`(select count(*) from questions where questions.subject_id = ${subjects.id} and questions.mode = 'CBT' and questions.published = 1)`,
    })
    .from(subjects)
    .orderBy(subjects.name);

  return rows.map((row) => ({
    ...row,
    topicCount: Number(row.topicCount) || 0,
    studyCount: Number(row.studyCount) || 0,
    cbtCount: Number(row.cbtCount) || 0,
  }));
}

export async function getSubjectById(id: string) {
  const db = getDb();
  const rows = await db.select().from(subjects).where(eq(subjects.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createSubject(data: {
  id: string;
  name: string;
  description: string;
}) {
  const db = getDb();
  await db.insert(subjects).values(data);
  return getSubjectById(data.id);
}

export async function deleteSubject(id: string) {
  const db = getDb();
  await db.delete(subjects).where(eq(subjects.id, id));
}

export async function listTopicsForSubject(subjectId: string) {
  const db = getDb();
  return db
    .select()
    .from(topics)
    .where(eq(topics.subjectId, subjectId))
    .orderBy(topics.name);
}

export async function createTopic(data: {
  id: string;
  subjectId: string;
  name: string;
}) {
  const db = getDb();
  await db.insert(topics).values(data);
  const rows = await db.select().from(topics).where(eq(topics.id, data.id)).limit(1);
  return rows[0] ?? null;
}

export async function deleteTopic(id: string) {
  const db = getDb();
  await db.delete(topics).where(eq(topics.id, id));
}

export async function findTopicByName(subjectId: string, name: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(topics)
    .where(eq(topics.subjectId, subjectId));
  const lower = name.trim().toLowerCase();
  return rows.find((t) => t.name.toLowerCase() === lower) ?? null;
}
