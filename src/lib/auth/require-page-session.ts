import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { resolveUserAccess } from "@/lib/auth/access";

/** Server-side page guard. Redirects to login with return path. */
export async function requirePageSession(nextPath: string) {
  const session = await getSession();
  if (!session) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  return session;
}

/**
 * Requires login AND an active trial or paid plan.
 * Expired trial / no activation → /subscription.
 * Deactivated → /subscription with blocked state.
 */
export async function requirePracticeAccess(nextPath: string) {
  const session = await requirePageSession(nextPath);
  if (session.user.role === "ADMIN") {
    return session;
  }
  const access = resolveUserAccess(session.user);
  if (!access.canAccess) {
    redirect(`/subscription?reason=${encodeURIComponent(access.source)}`);
  }
  return session;
}
