import { NextResponse } from "next/server";
import { adminCreateSubject } from "@/server/services/subjects";
import { listCatalog } from "@/server/services/questions";
import { AppError, ForbiddenError, UnauthorizedError, ValidationError } from "@/lib/errors";

export async function GET() {
  try {
    // Admin can use the same catalog shape
    const { requireAdminSession } = await import("@/server/policies/auth");
    await requireAdminSession();
    const subjects = await listCatalog();
    return NextResponse.json({ subjects });
  } catch (error) {
    if (error instanceof UnauthorizedError || error instanceof ForbiddenError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    return NextResponse.json({ message: "Unable to load subjects." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const subject = await adminCreateSubject(body);
    return NextResponse.json({ subject }, { status: 201 });
  } catch (error) {
    if (
      error instanceof ValidationError ||
      error instanceof UnauthorizedError ||
      error instanceof ForbiddenError ||
      error instanceof AppError
    ) {
      return NextResponse.json(
        { message: error.message, issues: (error as ValidationError).issues },
        { status: error.status },
      );
    }
    console.error("admin create subject:", error);
    return NextResponse.json({ message: "Unable to create subject." }, { status: 500 });
  }
}
