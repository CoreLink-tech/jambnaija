import { desc, eq } from "drizzle-orm";
import { getDb, users, withdrawals } from "@/lib/db";
import { requireSession, requireAdminSession } from "@/server/policies/auth";
import { createId } from "@/lib/security/id";
import {
  AppError,
  ForbiddenError,
  ValidationError,
} from "@/lib/errors";
import { withdrawalSchema } from "@/lib/validation/auth";

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

  const referralCount = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.referredById, me.id));

  const myWithdrawals = await db
    .select()
    .from(withdrawals)
    .where(eq(withdrawals.userId, me.id))
    .orderBy(desc(withdrawals.createdAt))
    .limit(20);

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://jambnaija.vercel.app");

  const code = (me.referralCode || "").toUpperCase();

  return {
    referralCode: code || null,
    referralLink: code
      ? `${String(baseUrl).replace(/\/$/, "")}/register?ref=${code}`
      : `${String(baseUrl).replace(/\/$/, "")}/register`,
    walletBalance: me.walletBalance ?? 0,
    referralCount: referralCount.length,
    withdrawals: myWithdrawals,
  };
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
