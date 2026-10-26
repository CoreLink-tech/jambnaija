import { NextResponse } from "next/server";
import { adminGenerateCodes, adminListCodes } from "@/server/services/admin";
import {
  ForbiddenError,
  UnauthorizedError,
  ValidationError,
} from "@/lib/errors";

export async function GET() {
  try {
    const codes = await adminListCodes();
    return NextResponse.json({ codes });
  } catch (error) {
    if (error instanceof UnauthorizedError || error instanceof ForbiddenError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("list codes:", error);
    return NextResponse.json({ message: "Unable to list codes." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await adminGenerateCodes(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (
      error instanceof ValidationError ||
      error instanceof UnauthorizedError ||
      error instanceof ForbiddenError
    ) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("generate codes:", error);
    return NextResponse.json({ message: "Unable to generate codes." }, { status: 500 });
  }
}
