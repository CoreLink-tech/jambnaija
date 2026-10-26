import { getSession, requireSession, requireAdminSession } from "@/lib/auth/session";
import { resolveUserAccess, isPremiumAccess, type AccessResult } from "@/lib/auth/access";
import { ForbiddenError } from "@/lib/errors";

export { getSession, requireSession, requireAdminSession };

export async function requireStudentAccess(): Promise<{
  session: Awaited<ReturnType<typeof requireSession>>;
  access: AccessResult;
}> {
  const session = await requireSession();
  if (session.user.role !== "STUDENT") {
    throw new ForbiddenError("Student access required.");
  }
  const access = resolveUserAccess(session.user);
  if (!access.canAccess) {
    throw new ForbiddenError(
      access.source === "deactivated"
        ? "This account has been deactivated."
        : "Account activation is required to continue.",
    );
  }
  return { session, access };
}

export async function requirePremiumAccess(): Promise<{
  session: Awaited<ReturnType<typeof requireSession>>;
  access: AccessResult;
}> {
  const result = await requireStudentAccess();
  if (!isPremiumAccess(result.access)) {
    throw new ForbiddenError("Premium access is required for this feature.");
  }
  return result;
}
