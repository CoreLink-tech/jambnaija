import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/service";
import { DashboardView } from "@/components/student/dashboard-view";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <DashboardView
      user={{
        email: user.email,
        username: user.username,
        access: user.access,
      }}
    />
  );
}
