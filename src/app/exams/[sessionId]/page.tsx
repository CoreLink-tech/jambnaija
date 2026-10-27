import { ExamRunner } from "@/components/exam/exam-runner";

export const metadata = { title: "Exam in progress" };

export default async function ExamSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  return (
    <main className="min-h-screen bg-background px-4 py-6">
      <ExamRunner sessionId={sessionId} />
    </main>
  );
}
