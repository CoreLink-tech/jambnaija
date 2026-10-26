import { NextResponse } from "next/server";
import { adminListQuestions, adminDeleteQuestion } from "@/server/services/questions";
import { AppError, ForbiddenError, NotFoundError, UnauthorizedError, ValidationError } from "@/lib/errors";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());
    const result = await adminListQuestions(query);
    return NextResponse.json(result);
  } catch (error) {
    if (
      error instanceof ValidationError ||
      error instanceof UnauthorizedError ||
      error instanceof ForbiddenError
    ) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("admin list questions:", error);
    return NextResponse.json({ message: "Unable to list questions." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "id is required." }, { status: 400 });
    }
    await adminDeleteQuestion(id);
    return NextResponse.json({ message: "Deleted." });
  } catch (error) {
    if (
      error instanceof NotFoundError ||
      error instanceof UnauthorizedError ||
      error instanceof ForbiddenError ||
      error instanceof AppError
    ) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("admin delete question:", error);
    return NextResponse.json({ message: "Unable to delete question." }, { status: 500 });
  }
}
