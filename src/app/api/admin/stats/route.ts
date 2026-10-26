import { NextResponse } from "next/server";
import { getAdminStats } from "@/server/services/admin";
import { ForbiddenError, UnauthorizedError } from "@/lib/errors";

export async function GET() {
  try {
    const stats = await getAdminStats();
    return NextResponse.json({ stats });
  } catch (error) {
    if (error instanceof UnauthorizedError || error instanceof ForbiddenError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("admin stats:", error);
    return NextResponse.json({ message: "Unable to load stats." }, { status: 500 });
  }
}
