import { ExamResultView } from "@/components/exam/result-view";
import { requirePageSession } from "@/lib/auth/require-page-session";

export const metadata = { title: "Exam result" };

export default async function Page({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  await requirePageSession(`/exams/${sessionId}/result`);
  return (
    <main className="min-h-screen px-4 py-8">
      <ExamResultView sessionId={sessionId} />
    </main>
  );
}
