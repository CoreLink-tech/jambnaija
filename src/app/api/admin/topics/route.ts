import { NextResponse } from "next/server";
import { adminCreateTopic } from "@/server/services/subjects";
import { AppError, ForbiddenError, NotFoundError, UnauthorizedError, ValidationError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const topic = await adminCreateTopic(body);
    return NextResponse.json({ topic }, { status: 201 });
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
    console.error("admin create topic:", error);
    return NextResponse.json({ message: "Unable to create topic." }, { status: 500 });
  }
}
