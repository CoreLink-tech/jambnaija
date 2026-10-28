import { redirect } from "next/navigation";
import { requirePageSession } from "@/lib/auth/require-page-session";

export const metadata = { title: "CBT" };

/** Legacy CBT entry — require login, then send to exam setup. */
export default async function CbtPage() {
  await requirePageSession("/exams/setup");
  redirect("/exams/setup");
}
