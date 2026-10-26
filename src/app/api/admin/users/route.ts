import { NextResponse } from "next/server";
import { adminListUsers } from "@/server/services/admin";
import { ForbiddenError, UnauthorizedError } from "@/lib/errors";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || undefined;
    const page = Number(url.searchParams.get("page") || "1");
    const result = await adminListUsers({ search, page });
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof UnauthorizedError || error instanceof ForbiddenError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("admin users:", error);
    return NextResponse.json({ message: "Unable to list users." }, { status: 500 });
  }
}
