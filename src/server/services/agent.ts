import { desc, eq } from "drizzle-orm";
import { getDb, users, withdrawals } from "@/lib/db";
import { requireSession, requireAdminSession } from "@/server/policies/auth";
import { createId } from "@/lib/security/id";
import {
  AppError,
  ForbiddenError,
  ValidationError,
} from "@/lib/errors";
import { withdrawalSchema, PUBLIC_SITE_URL } from "@/lib/validation/auth";

function generateReferralCode(username: string | null): string {
  const base = (username || "user").replace(/[^a-z0-9]/gi, "").slice(0, 8);
  const suffix = Math.random().toString(36).slice(2, 6);
  return `JN${base}${suffix}`.toUpperCase();
}

export async function getAgentDashboard() {
  const session = await requireSession();
  if (session.user.role !== "STUDENT") {
    throw new ForbiddenError("Agents are student accounts.");
  }
  const db = getDb();
  const rows = await db
    .select({
      id: users.id,
      referralCode: users.referralCode,
      walletBalance: users.walletBalance,
      username: users.username,
    })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);
  const me = rows[0];
  if (!me) throw new AppError("User not found.", "USER_MISSING", 404);

  // Ensure every agent has a referral code (backfill older accounts)
  let code = (me.referralCode || "").toUpperCase();
  if (!code) {
    code = generateReferralCode(me.username);
    // Retry once on rare unique collision
    try {
      await db
        .update(users)
        .set({ referralCode: code, updatedAt: new Date() })
        .where(eq(users.id, me.id));
    } catch {
      code = generateReferralCode(me.username);
      await db
        .update(users)
        .set({ referralCode: code, updatedAt: new Date() })
        .where(eq(users.id, me.id));
    }
  }

  const referred = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      status: users.status,
      planTier: users.planTier,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.referredById, me.id))
    .orderBy(desc(users.createdAt))
    .limit(100);

  const myWithdrawals = await db
    .select()
    .from(withdrawals)
    .where(eq(withdrawals.userId, me.id))
    .orderBy(desc(withdrawals.createdAt))
    .limit(20);

  return {
    referralCode: code,
    referralLink: `${PUBLIC_SITE_URL}/register?ref=${encodeURIComponent(code)}`,
    walletBalance: me.walletBalance ?? 0,
    referralCount: referred.length,
    referrals: referred.map((r) => ({
      id: r.id,
      username: r.username,
      // Mask email for privacy: a***@domain
      email: maskEmail(r.email),
      status: r.status,
      planTier: r.planTier,
      joinedAt: r.createdAt,
    })),
    withdrawals: myWithdrawals,
  };
}

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return "***";
  const shown = local.slice(0, 1);
  return `${shown}***@${domain}`;
}

export async function requestWithdrawal(raw: unknown) {
  const session = await requireSession();
  if (session.user.role !== "STUDENT") {
    throw new ForbiddenError("Only students can withdraw.");
  }
  const parsed = withdrawalSchema.safeParse(raw);
  if (!parsed.success) {
    throw new ValidationError("Invalid withdrawal request.", parsed.error.flatten());
  }
  const { amount, accountNumber, accountName } = parsed.data;
  const db = getDb();
  const rows = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);
  const user = rows[0];
  if (!user) throw new AppError("User not found.", "USER_MISSING", 404);
  const balance = user.walletBalance ?? 0;
  if (amount !== balance) {
    throw new ValidationError(
      "Withdrawal amount must equal your full available wallet balance.",
    );
  }
  if (balance <= 0) {
    throw new ValidationError("Wallet balance is empty.");
  }

  const id = createId("wd");
  await db.insert(withdrawals).values({
    id,
    userId: user.id,
    amount,
    accountNumber,
    accountName,
    status: "PENDING",
  });
  // Hold funds
  await db
    .update(users)
    .set({ walletBalance: 0, updatedAt: new Date() })
    .where(eq(users.id, user.id));

  return { message: "Withdrawal request submitted.", id, amount };
}

export async function adminListWithdrawals() {
  await requireAdminSession();
  const db = getDb();
  const rows = await db
    .select({
      id: withdrawals.id,
      amount: withdrawals.amount,
      accountNumber: withdrawals.accountNumber,
      accountName: withdrawals.accountName,
      status: withdrawals.status,
      createdAt: withdrawals.createdAt,
      userId: withdrawals.userId,
      userEmail: users.email,
      username: users.username,
    })
    .from(withdrawals)
    .leftJoin(users, eq(withdrawals.userId, users.id))
    .orderBy(desc(withdrawals.createdAt))
    .limit(100);
  return { withdrawals: rows };
}

export async function adminProcessWithdrawal(
  id: string,
  action: "approve" | "reject",
) {
  await requireAdminSession();
  const db = getDb();
  const rows = await db
    .select()
    .from(withdrawals)
    .where(eq(withdrawals.id, id))
    .limit(1);
  const w = rows[0];
  if (!w) throw new AppError("Withdrawal not found.", "NOT_FOUND", 404);
  if (w.status !== "PENDING") {
    throw new ValidationError("This withdrawal was already processed.");
  }
  if (action === "approve") {
    await db
      .update(withdrawals)
      .set({ status: "APPROVED", processedAt: new Date() })
      .where(eq(withdrawals.id, id));
    return { message: "Withdrawal approved." };
  }
  // reject — refund wallet
  const u = await db
    .select({ walletBalance: users.walletBalance })
    .from(users)
    .where(eq(users.id, w.userId))
    .limit(1);
  const bal = u[0]?.walletBalance ?? 0;
  await db
    .update(users)
    .set({ walletBalance: bal + w.amount, updatedAt: new Date() })
    .where(eq(users.id, w.userId));
  await db
    .update(withdrawals)
    .set({ status: "REJECTED", processedAt: new Date() })
    .where(eq(withdrawals.id, id));
  return { message: "Withdrawal rejected and balance restored." };
}
