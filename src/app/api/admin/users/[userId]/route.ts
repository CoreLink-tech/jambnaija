import { NextResponse } from "next/server";
import { adminUpdateUser, adminDeleteUser } from "@/server/services/admin";
import {
  AppError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "@/lib/errors";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await context.params;
    const body = await request.json();
    const user = await adminUpdateUser(userId, body);
    return NextResponse.json({ user });
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
    console.error("admin patch user:", error);
    return NextResponse.json({ message: "Unable to update user." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await context.params;
    await adminDeleteUser(userId);
    return NextResponse.json({ message: "Deleted." });
  } catch (error) {
    if (
      error instanceof UnauthorizedError ||
      error instanceof ForbiddenError ||
      error instanceof AppError
    ) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("admin delete user:", error);
    return NextResponse.json({ message: "Unable to delete user." }, { status: 500 });
  }
}
