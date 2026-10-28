import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ExamSetupForm } from "@/components/exam/setup-form";
import { requirePageSession } from "@/lib/auth/require-page-session";

export const metadata = { title: "Exam setup" };

export default async function ExamSetupPage() {
  await requirePageSession("/exams/setup");

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="px-4 py-10">
        <ExamSetupForm />
      </main>
      <SiteFooter />
    </div>
  );
}
