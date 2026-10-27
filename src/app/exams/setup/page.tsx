import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ExamSetupForm } from "@/components/exam/setup-form";

export const metadata = { title: "Exam setup" };

export default function ExamSetupPage() {
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
