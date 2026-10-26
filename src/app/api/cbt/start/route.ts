import { NextResponse } from "next/server";
import { startCbtAttempt } from "@/server/services/cbt";
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
    const result = await startCbtAttempt(body);
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
    console.error("cbt start:", error);
    return NextResponse.json({ message: "Unable to start CBT." }, { status: 500 });
  }
}
