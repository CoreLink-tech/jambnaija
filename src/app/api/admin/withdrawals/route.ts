import { NextResponse } from "next/server";
import {
  adminListWithdrawals,
  adminProcessWithdrawal,
} from "@/server/services/agent";
import {
  AppError,
  ForbiddenError,
  UnauthorizedError,
  ValidationError,
} from "@/lib/errors";

export async function GET() {
  try {
    const data = await adminListWithdrawals();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof UnauthorizedError || error instanceof ForbiddenError) {
      return NextResponse.json(
        { message: error.message },
        { status: (error as AppError).status },
      );
    }
    console.error("list withdrawals:", error);
    return NextResponse.json(
      { message: "Unable to list withdrawals." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await adminProcessWithdrawal(body.id, body.action);
    return NextResponse.json(result);
  } catch (error) {
    if (
      error instanceof ValidationError ||
      error instanceof UnauthorizedError ||
      error instanceof ForbiddenError ||
      error instanceof AppError
    ) {
      return NextResponse.json(
        { message: error.message },
        { status: (error as AppError).status || 400 },
      );
    }
    console.error("process withdrawal:", error);
    return NextResponse.json({ message: "Unable to process." }, { status: 500 });
  }
}
