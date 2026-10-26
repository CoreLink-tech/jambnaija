import { NextResponse } from "next/server";
import { getSubjectPastSets } from "@/server/services/questions";
import { AppError, ForbiddenError, NotFoundError, UnauthorizedError } from "@/lib/errors";

export async function GET(
  _request: Request,
  context: { params: Promise<{ subjectId: string }> },
) {
  try {
    const { subjectId } = await context.params;
    const pastSets = await getSubjectPastSets(subjectId);
    return NextResponse.json({ pastSets });
  } catch (error) {
    if (
      error instanceof UnauthorizedError ||
      error instanceof ForbiddenError ||
      error instanceof NotFoundError ||
      error instanceof AppError
    ) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("past-sets error:", error);
    return NextResponse.json({ message: "Unable to load past sets." }, { status: 500 });
  }
}
