import { NextResponse } from "next/server";
import { adminCreateStudyQuestion } from "@/server/services/questions";
import { AppError, ForbiddenError, NotFoundError, UnauthorizedError, ValidationError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = await adminCreateStudyQuestion(body);
    return NextResponse.json({ question }, { status: 201 });
  } catch (error) {
    if (
      error instanceof ValidationError ||
      error instanceof UnauthorizedError ||
      error instanceof ForbiddenError ||
      error instanceof NotFoundError ||
      error instanceof AppError
    ) {
      return NextResponse.json(
        { message: error.message, issues: (error as ValidationError).issues },
        { status: error.status },
      );
    }
    console.error("admin study question:", error);
    return NextResponse.json({ message: "Unable to create question." }, { status: 500 });
  }
}
