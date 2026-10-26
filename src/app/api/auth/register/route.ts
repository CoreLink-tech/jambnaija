import { NextResponse } from "next/server";
import { registerStudent } from "@/lib/auth/service";
import { AppError, ValidationError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await registerStudent(body);
    return NextResponse.json(
      { message: "Registration successful.", user: result.user },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { message: error.message, issues: error.issues },
        { status: 400 },
      );
    }
    if (error instanceof AppError) {
      return NextResponse.json(
        { message: error.message, code: error.code },
        { status: error.status },
      );
    }
    console.error("register error:", error);
    return NextResponse.json(
      { message: "Unable to register. Please try again." },
      { status: 500 },
    );
  }
}
