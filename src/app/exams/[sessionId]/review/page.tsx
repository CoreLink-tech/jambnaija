import { ExamReviewView } from "@/components/exam/review-view";

export const metadata = { title: "Review answers" };

export default async function Page({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  return (
    <main className="min-h-screen px-4 py-8">
      <ExamReviewView sessionId={sessionId} />
    </main>
  );
}
