import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SUBJECT_META, SUBJECTS, type JambSubject } from "@/data/questions/types";
import { filterQuestions } from "@/data/questions";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  if (!(SUBJECTS as string[]).includes(subject)) notFound();
  const s = subject as JambSubject;
  const questions = filterQuestions({ subjects: [s] });
  const byYear: Record<number, number> = {};
  for (const q of questions) {
    byYear[q.year] = (byYear[q.year] || 0) + 1;
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-strong">
            {SUBJECT_META[s].name}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {questions.length} original practice questions across 2020–2026.
          </p>
        </div>
        <Card className="space-y-2">
          {Object.entries(byYear)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([y, n]) => (
              <div key={y} className="flex justify-between text-sm">
                <span>{y}</span>
                <span className="text-muted">{n} items</span>
              </div>
            ))}
        </Card>
        <Link href="/exams/setup">
          <Button>Practise this subject</Button>
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
