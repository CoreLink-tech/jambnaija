import { NextResponse } from "next/server";
import { createCbtQuestionSet } from "@/server/services/questions";
import { AppError, ForbiddenError, NotFoundError, UnauthorizedError, ValidationError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const set = await createCbtQuestionSet(body);
    return NextResponse.json(set);
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
    console.error("cbt questions:", error);
    return NextResponse.json({ message: "Unable to load CBT questions." }, { status: 500 });
  }
}
