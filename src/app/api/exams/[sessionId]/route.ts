import { NextResponse } from "next/server";
import {
  getExamResult,
  getInProgressExam,
} from "@/server/services/exam-bank";
import {
  AppError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "@/lib/errors";
import { getAttemptById } from "@/server/repositories/attempts";
import { requireSession } from "@/server/policies/auth";

export async function GET(
  _request: Request,
  context: { params: Promise<{ sessionId: string }> },
) {
  try {
    const { sessionId } = await context.params;
    await requireSession();
    const attempt = await getAttemptById(sessionId);
    if (!attempt) {
      return NextResponse.json({ message: "Not found." }, { status: 404 });
    }
    if (attempt.status === "IN_PROGRESS") {
      const data = await getInProgressExam(sessionId);
      return NextResponse.json(data);
    }
    const data = await getExamResult(sessionId);
    return NextResponse.json(data);
  } catch (error) {
    if (
      error instanceof UnauthorizedError ||
      error instanceof ForbiddenError ||
      error instanceof NotFoundError ||
      error instanceof AppError
    ) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("exam get:", error);
    return NextResponse.json({ message: "Unable to load exam." }, { status: 500 });
  }
}
