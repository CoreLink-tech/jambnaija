import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, users } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { createId } from "@/lib/security/id";

const schema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(128),
  bootstrapKey: z.string().min(8),
});

/**
 * Controlled admin creation.
 * Requires ADMIN_BOOTSTRAP_KEY. Refuses if an admin already exists.
 */
export async function POST(request: Request) {
  try {
    const expected = process.env.ADMIN_BOOTSTRAP_KEY;
    if (!expected) {
      return NextResponse.json(
        { message: "Bootstrap is disabled." },
        { status: 403 },
      );
    }

    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid payload." }, { status: 400 });
    }
    if (parsed.data.bootstrapKey !== expected) {
      return NextResponse.json({ message: "Invalid bootstrap key." }, { status: 403 });
    }

    const db = getDb();
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.role, "ADMIN"))
      .limit(1);
    if (existing[0]) {
      return NextResponse.json(
        { message: "An admin already exists." },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(parsed.data.password);
    const id = createId("usr");
    await db.insert(users).values({
      id,
      email: parsed.data.email,
      username: null,
      passwordHash,
      role: "ADMIN",
      status: "ACTIVE",
      planTier: "PREMIUM",
    });

    return NextResponse.json(
      { message: "Admin created.", email: parsed.data.email },
      { status: 201 },
    );
  } catch (error) {
    console.error("bootstrap-admin:", error);
    return NextResponse.json({ message: "Bootstrap failed." }, { status: 500 });
  }
}
