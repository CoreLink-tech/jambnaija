import { NextResponse } from "next/server";
import { createStudySession } from "@/server/services/questions";
import { AppError, ForbiddenError, NotFoundError, UnauthorizedError, ValidationError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await createStudySession(body);
    return NextResponse.json(session);
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
    console.error("study session:", error);
    return NextResponse.json({ message: "Unable to start study session." }, { status: 500 });
  }
}
