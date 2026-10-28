import { ExamReviewView } from "@/components/exam/review-view";
import { requirePageSession } from "@/lib/auth/require-page-session";

export const metadata = { title: "Review answers" };

export default async function Page({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  await requirePageSession(`/exams/${sessionId}/review`);
  return (
    <main className="min-h-screen px-4 py-8">
      <ExamReviewView sessionId={sessionId} />
    </main>
  );
}
