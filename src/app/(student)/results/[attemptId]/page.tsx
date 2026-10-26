import { ResultView } from "@/components/student/result-view";

export const metadata = { title: "Result" };

export default async function ResultPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = await params;
  return <ResultView attemptId={attemptId} />;
}
