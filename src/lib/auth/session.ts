import { cookies } from "next/headers";
import { eq, and, gt } from "drizzle-orm";
import { getDb, sessions, users } from "@/lib/db";
import { createId } from "@/lib/security/id";
import type { Role } from "@/lib/auth/access";

const SESSION_COOKIE = "jambnaija_session";
const SESSION_DAYS = 7;
const SESSION_MS = SESSION_DAYS * 24 * 60 * 60 * 1000;

export interface SessionUser {
  id: string;
  email: string;
  username: string | null;
  role: Role;
  status: string;
  planTier: string | null;
  trialPremiumEndsAt: Date | null;
  deviceId: string | null;
}

export interface SessionPayload {
  sessionId: string;
  user: SessionUser;
}

function cookieOptions(expires: Date) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    expires,
  };
}

export async function createSession(userId: string): Promise<string> {
  const db = getDb();
  const sessionId = createId("sess");
  const expiresAt = new Date(Date.now() + SESSION_MS);

  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
  });

  const jar = await cookies();
  jar.set(SESSION_COOKIE, sessionId, cookieOptions(expiresAt));

  return sessionId;
}

export async function destroySession(sessionId?: string | null): Promise<void> {
  const jar = await cookies();
  const id = sessionId ?? jar.get(SESSION_COOKIE)?.value;

  if (id) {
    const db = getDb();
    await db.delete(sessions).where(eq(sessions.id, id));
  }

  jar.set(SESSION_COOKIE, "", {
    ...cookieOptions(new Date(0)),
    maxAge: 0,
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const sessionId = jar.get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const db = getDb();
  const now = new Date();

  const rows = await db
    .select({
      sessionId: sessions.id,
      expiresAt: sessions.expiresAt,
      userId: users.id,
      email: users.email,
      username: users.username,
      role: users.role,
      status: users.status,
      planTier: users.planTier,
      trialPremiumEndsAt: users.trialPremiumEndsAt,
      deviceId: users.deviceId,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.id, sessionId), gt(sessions.expiresAt, now)))
    .limit(1);

  const row = rows[0];
  if (!row) {
    // Clear stale cookie
    jar.set(SESSION_COOKIE, "", {
      ...cookieOptions(new Date(0)),
      maxAge: 0,
    });
    return null;
  }

  return {
    sessionId: row.sessionId,
    user: {
      id: row.userId,
      email: row.email,
      username: row.username,
      role: row.role as Role,
      status: row.status,
      planTier: row.planTier,
      trialPremiumEndsAt: row.trialPremiumEndsAt,
      deviceId: row.deviceId,
    },
  };
}

export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    const { UnauthorizedError } = await import("@/lib/errors");
    throw new UnauthorizedError();
  }
  return session;
}

export async function requireAdminSession(): Promise<SessionPayload> {
  const session = await requireSession();
  if (session.user.role !== "ADMIN") {
    const { ForbiddenError } = await import("@/lib/errors");
    throw new ForbiddenError("Admin access required.");
  }
  return session;
}
