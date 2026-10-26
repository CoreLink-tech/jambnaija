import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/service";
import { AdminShell } from "@/components/layout/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/dashboard");

  return <AdminShell email={user.email}>{children}</AdminShell>;
}
