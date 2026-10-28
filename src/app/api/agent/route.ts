import { NextResponse } from "next/server";
import { getAgentDashboard, requestWithdrawal } from "@/server/services/agent";
import {
  AppError,
  ForbiddenError,
  UnauthorizedError,
  ValidationError,
} from "@/lib/errors";

export async function GET() {
  try {
    const data = await getAgentDashboard();
    return NextResponse.json(data);
  } catch (error) {
    if (
      error instanceof UnauthorizedError ||
      error instanceof ForbiddenError ||
      error instanceof AppError
    ) {
      return NextResponse.json(
        { message: error.message },
        { status: (error as AppError).status },
      );
    }
    console.error("agent get:", error);
    return NextResponse.json(
      { message: "Unable to load agent data." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await requestWithdrawal(body);
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
    console.error("agent withdraw:", error);
    return NextResponse.json(
      { message: "Unable to submit withdrawal." },
      { status: 500 },
    );
  }
}
