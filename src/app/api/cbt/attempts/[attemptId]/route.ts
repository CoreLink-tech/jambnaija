import { NextResponse } from "next/server";
import { getAttemptResult } from "@/server/services/cbt";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "@/lib/errors";

export async function GET(
  _request: Request,
  context: { params: Promise<{ attemptId: string }> },
) {
  try {
    const { attemptId } = await context.params;
    const result = await getAttemptResult(attemptId);
    return NextResponse.json(result);
  } catch (error) {
    if (
      error instanceof UnauthorizedError ||
      error instanceof ForbiddenError ||
      error instanceof NotFoundError
    ) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("get attempt:", error);
    return NextResponse.json({ message: "Unable to load result." }, { status: 500 });
  }
}
