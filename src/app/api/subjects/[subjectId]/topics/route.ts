import { NextResponse } from "next/server";
import { getSubjectTopics } from "@/server/services/subjects";
import { AppError, NotFoundError } from "@/lib/errors";

export async function GET(
  _request: Request,
  context: { params: Promise<{ subjectId: string }> },
) {
  try {
    const { subjectId } = await context.params;
    const topics = await getSubjectTopics(subjectId);
    return NextResponse.json({ topics });
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof AppError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("topics error:", error);
    return NextResponse.json({ message: "Unable to load topics." }, { status: 500 });
  }
}
