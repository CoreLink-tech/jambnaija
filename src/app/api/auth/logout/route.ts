import { NextResponse } from "next/server";
import { logoutUser } from "@/lib/auth/service";

export async function POST() {
  try {
    await logoutUser();
    return NextResponse.json({ message: "Logged out." });
  } catch (error) {
    console.error("logout error:", error);
    return NextResponse.json(
      { message: "Unable to log out." },
      { status: 500 },
    );
  }
}
