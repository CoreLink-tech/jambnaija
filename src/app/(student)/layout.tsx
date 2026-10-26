import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/service";
import { StudentShell } from "@/components/layout/student-shell";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <StudentShell userLabel={user.username || user.email}>
      {children}
    </StudentShell>
  );
}
