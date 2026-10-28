import { NextResponse } from "next/server";
import { loginAdmin } from "@/lib/auth/service";
import { AppError, UnauthorizedError, ValidationError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await loginAdmin(body);
    return NextResponse.json({
      message: "Admin login successful.",
      user: result.user,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { message: error.message, issues: error.issues },
        { status: 400 },
      );
    }
    if (error instanceof UnauthorizedError || error instanceof AppError) {
      return NextResponse.json(
        { message: error.message, code: (error as AppError).code },
        { status: (error as AppError).status },
      );
    }
    console.error("admin login error:", error);
    return NextResponse.json({ message: "Unable to log in." }, { status: 500 });
  }
}
