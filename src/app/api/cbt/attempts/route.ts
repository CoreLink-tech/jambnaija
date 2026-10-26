import { NextResponse } from "next/server";
import { listMyAttempts } from "@/server/services/cbt";
import { ForbiddenError, UnauthorizedError } from "@/lib/errors";

export async function GET() {
  try {
    const attempts = await listMyAttempts();
    return NextResponse.json({ attempts });
  } catch (error) {
    if (error instanceof UnauthorizedError || error instanceof ForbiddenError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("list attempts:", error);
    return NextResponse.json({ message: "Unable to load attempts." }, { status: 500 });
  }
}
