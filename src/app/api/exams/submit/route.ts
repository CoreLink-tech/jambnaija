import { NextResponse } from "next/server";
import { submitExamSession } from "@/server/services/exam-bank";
import {
  AppError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await submitExamSession(body);
    return NextResponse.json(result);
  } catch (error) {
    if (
      error instanceof ValidationError ||
      error instanceof UnauthorizedError ||
      error instanceof ForbiddenError ||
      error instanceof NotFoundError ||
      error instanceof AppError
    ) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("exam submit:", error);
    return NextResponse.json({ message: "Unable to submit exam." }, { status: 500 });
  }
}
