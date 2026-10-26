import { NextResponse } from "next/server";
import { redeemActivationCode } from "@/server/services/activation";
import {
  AppError,
  ForbiddenError,
  UnauthorizedError,
  ValidationError,
} from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await redeemActivationCode(body);
    return NextResponse.json(result);
  } catch (error) {
    if (
      error instanceof ValidationError ||
      error instanceof UnauthorizedError ||
      error instanceof ForbiddenError ||
      error instanceof AppError
    ) {
      return NextResponse.json(
        { message: error.message, code: (error as AppError).code },
        { status: (error as AppError).status },
      );
    }
    console.error("activate:", error);
    return NextResponse.json(
      { message: "Unable to activate account." },
      { status: 500 },
    );
  }
}
