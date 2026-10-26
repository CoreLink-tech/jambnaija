import { and, desc, eq, like, or, sql, count } from "drizzle-orm";
import {
  getDb,
  users,
  activationCodes,
  questions,
  subjects,
} from "@/lib/db";

export async function listUsers(options: {
  search?: string;
  limit?: number;
  offset?: number;
}) {
  const db = getDb();
  const limit = options.limit ?? 50;
  const offset = options.offset ?? 0;
  const conditions = [];
  if (options.search) {
    const q = `%${options.search}%`;
    conditions.push(
      or(like(users.email, q), like(users.username, q))!,
    );
  }
  const whereClause = conditions.length ? and(...conditions) : undefined;

  const [rows, total] = await Promise.all([
    db
      .select({
        id: users.id,
        email: users.email,
        username: users.username,
        role: users.role,
        status: users.status,
        planTier: users.planTier,
        trialPremiumEndsAt: users.trialPremiumEndsAt,
        deviceId: users.deviceId,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(whereClause)
      .orderBy(desc(users.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ value: count() }).from(users).where(whereClause),
  ]);

  return { items: rows, total: Number(total[0]?.value ?? 0) };
}

export async function updateUserState(
  id: string,
  patch: {
    status?: "PENDING" | "ACTIVE" | "DEACTIVATED";
    planTier?: "STANDARD" | "PREMIUM" | null;
  },
) {
  const db = getDb();
  await db
    .update(users)
    .set({
      ...patch,
      updatedAt: new Date(),
    })
    .where(eq(users.id, id));
  const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function deleteUser(id: string) {
  const db = getDb();
  await db.delete(users).where(eq(users.id, id));
}

export async function createActivationCodes(data: {
  codes: string[];
  tier: "STANDARD" | "PREMIUM";
  createdById: string;
}) {
  const db = getDb();
  const values = data.codes.map((code) => ({
    code,
    tier: data.tier,
    isActive: true,
    createdById: data.createdById,
  }));
  await db.insert(activationCodes).values(values);
}

export async function listActivationCodes(limit = 100) {
  const db = getDb();
  return db
    .select()
    .from(activationCodes)
    .orderBy(desc(activationCodes.createdAt))
    .limit(limit);
}

export async function adminStats() {
  const db = getDb();
  const [userCount] = await db.select({ value: count() }).from(users);
  const [questionCount] = await db.select({ value: count() }).from(questions);
  const [subjectCount] = await db.select({ value: count() }).from(subjects);
  const [activeCodes] = await db
    .select({ value: count() })
    .from(activationCodes)
    .where(
      and(
        eq(activationCodes.isActive, true),
        sql`${activationCodes.usedById} is null`,
      ),
    );

  return {
    users: Number(userCount?.value ?? 0),
    questions: Number(questionCount?.value ?? 0),
    subjects: Number(subjectCount?.value ?? 0),
    unusedActivationCodes: Number(activeCodes?.value ?? 0),
  };
}
