import { eq } from "drizzle-orm";
import { getDb, users } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession, destroySession, getSession } from "@/lib/auth/session";
import {
  createTrialPremiumEndsAt,
  resolveUserAccess,
  type AccessResult,
} from "@/lib/auth/access";
import { createId } from "@/lib/security/id";
import {
  studentRegisterSchema,
  loginSchema,
  type StudentRegisterInput,
  type LoginInput,
} from "@/lib/validation/auth";
import {
  AppError,
  UnauthorizedError,
  ValidationError,
} from "@/lib/errors";

export interface PublicUser {
  id: string;
  email: string;
  username: string | null;
  role: string;
  status: string;
  planTier: string | null;
  access: AccessResult;
}

function toPublicUser(
  user: {
    id: string;
    email: string;
    username: string | null;
    role: string;
    status: string;
    planTier: string | null;
    trialPremiumEndsAt: Date | null;
  },
): PublicUser {
  const access = resolveUserAccess(user);
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    status: user.status,
    planTier: user.planTier,
    access,
  };
}

export async function registerStudent(
  raw: StudentRegisterInput,
): Promise<{ user: PublicUser }> {
  const parsed = studentRegisterSchema.safeParse(raw);
  if (!parsed.success) {
    throw new ValidationError("Invalid registration data.", parsed.error.flatten());
  }
  const data = parsed.data;
  const db = getDb();

  const existingEmail = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, data.email))
    .limit(1);
  if (existingEmail[0]) {
    throw new AppError("An account with this email already exists.", "EMAIL_TAKEN", 409);
  }

  const existingUsername = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.username, data.username))
    .limit(1);
  if (existingUsername[0]) {
    throw new AppError("This username is already taken.", "USERNAME_TAKEN", 409);
  }

  // Device binding: one account per device (preserve legacy rule)
  const existingDevice = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.deviceId, data.deviceId))
    .limit(1);
  if (existingDevice[0]) {
    throw new AppError(
      "This device is already linked to another account.",
      "DEVICE_TAKEN",
      409,
    );
  }

  const passwordHash = await hashPassword(data.password);
  const id = createId("usr");
  const trialEnds = createTrialPremiumEndsAt();

  await db.insert(users).values({
    id,
    email: data.email,
    username: data.username,
    passwordHash,
    role: "STUDENT",
    status: "PENDING",
    planTier: null,
    trialPremiumEndsAt: trialEnds,
    deviceId: data.deviceId,
  });

  const user = {
    id,
    email: data.email,
    username: data.username,
    role: "STUDENT",
    status: "PENDING",
    planTier: null as string | null,
    trialPremiumEndsAt: trialEnds,
  };

  await createSession(id);

  return { user: toPublicUser(user) };
}

export async function loginUser(
  raw: LoginInput,
): Promise<{ user: PublicUser }> {
  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    throw new ValidationError("Invalid login data.", parsed.error.flatten());
  }
  const data = parsed.data;
  const db = getDb();

  const rows = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email))
    .limit(1);

  const user = rows[0];
  // Generic error to avoid email enumeration
  if (!user) {
    throw new UnauthorizedError("Invalid email or password.");
  }

  const valid = await verifyPassword(data.password, user.passwordHash);
  if (!valid) {
    throw new UnauthorizedError("Invalid email or password.");
  }

  if (user.status === "DEACTIVATED") {
    throw new AppError("This account has been deactivated.", "DEACTIVATED", 403);
  }

  // Optional device check for students (preserve soft binding behaviour)
  if (
    user.role === "STUDENT" &&
    data.deviceId &&
    user.deviceId &&
    user.deviceId !== data.deviceId
  ) {
    throw new AppError(
      "This account is linked to a different device. Contact support if you need to transfer.",
      "DEVICE_MISMATCH",
      403,
    );
  }

  await createSession(user.id);

  return {
    user: toPublicUser({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      status: user.status,
      planTier: user.planTier,
      trialPremiumEndsAt: user.trialPremiumEndsAt,
    }),
  };
}

export async function logoutUser(): Promise<void> {
  const session = await getSession();
  await destroySession(session?.sessionId);
}

export async function getCurrentUser(): Promise<PublicUser | null> {
  const session = await getSession();
  if (!session) return null;
  return toPublicUser({
    id: session.user.id,
    email: session.user.email,
    username: session.user.username,
    role: session.user.role,
    status: session.user.status,
    planTier: session.user.planTier,
    trialPremiumEndsAt: session.user.trialPremiumEndsAt,
  });
}
