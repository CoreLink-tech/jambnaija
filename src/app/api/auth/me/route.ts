import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/service";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { message: "Not authenticated." },
        { status: 401 },
      );
    }
    return NextResponse.json({ user });
  } catch (error) {
    console.error("me error:", error);
    return NextResponse.json(
      { message: "Unable to load session." },
      { status: 500 },
    );
  }
}
