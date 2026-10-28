import { redirect } from "next/navigation";
import { requirePracticeAccess } from "@/lib/auth/require-page-session";

export const metadata = { title: "CBT" };

/** Legacy CBT entry — require login, then send to exam setup. */
export default async function CbtPage() {
  await requirePracticeAccess("/exams/setup");
  redirect("/exams/setup");
}
