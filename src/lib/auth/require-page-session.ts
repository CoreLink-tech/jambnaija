import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

/** Server-side page guard. Redirects to login with return path. */
export async function requirePageSession(nextPath: string) {
  const session = await getSession();
  if (!session) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  return session;
}
