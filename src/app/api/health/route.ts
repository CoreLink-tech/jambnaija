import { NextResponse } from "next/server";

/**
 * Lightweight readiness probe for hosts (Vercel/Render/etc.).
 * Does not touch the database so cold starts stay fast.
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "jambnaija",
    timestamp: new Date().toISOString(),
  });
}
