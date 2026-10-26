import { NextResponse } from "next/server";
import { listCatalog } from "@/server/services/questions";

export async function GET() {
  try {
    const subjects = await listCatalog();
    return NextResponse.json({ subjects });
  } catch (error) {
    console.error("subjects list error:", error);
    return NextResponse.json({ message: "Unable to load subjects." }, { status: 500 });
  }
}
