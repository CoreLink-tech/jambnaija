import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Card } from "@/components/ui/card";
import { SUBJECT_META, type JambSubject } from "@/data/questions/types";
import { filterQuestions } from "@/data/questions";

export const metadata = { title: "Subjects" };

const STREAMS: {
  key: string;
  title: string;
  subjects: JambSubject[];
}[] = [
  {
    key: "sciences",
    title: "Subjects in sciences",
    subjects: ["physics", "chemistry", "biology", "mathematics"],
  },
  {
    key: "arts",
    title: "Subjects in arts",
    subjects: ["literature", "crs", "english"],
  },
  {
    key: "social-sciences",
    title: "Subjects in social sciences",
    subjects: ["government"],
  },
  {
    key: "commercial",
    title: "Subjects in commercial studies",
    subjects: ["mathematics", "english"],
  },
];

export default async function SubjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ stream?: string }>;
}) {
  const { stream } = await searchParams;
  const active = STREAMS.find((s) => s.key === stream) ?? null;
  const groups = active ? [active] : STREAMS;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold text-primary-strong">
          {active ? active.title : "Subjects"}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {active
            ? "Subjects in this stream. Sign in to start a timed exam."
            : "Browse by stream. All items are original practice unless marked otherwise."}
        </p>

        {!active ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {STREAMS.map((s) => (
              <Link key={s.key} href={`/subjects?stream=${s.key}`}>
                <Card className="h-full hover:border-primary/30">
                  <h2 className="font-semibold">{s.title}</h2>
                  <p className="mt-1 text-sm text-muted">
                    {s.subjects.map((id) => SUBJECT_META[id].short).join(" · ")}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        ) : null}

        <div className="mt-8 space-y-8">
          {groups.map((group) => (
            <section key={group.key}>
              {active ? null : (
                <h2 className="mb-3 text-lg font-semibold text-primary-strong">
                  {group.title}
                </h2>
              )}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.subjects.map((s) => {
                  const n = filterQuestions({ subjects: [s] }).length;
                  return (
                    <Link key={`${group.key}-${s}`} href={`/subjects/${s}`}>
                      <Card className="h-full hover:border-primary/30">
                        <h3 className="font-semibold">{SUBJECT_META[s].name}</h3>
                        <p className="mt-1 text-sm text-muted">
                          {n} questions · 2020–2026
                        </p>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted">
          Ready to practise?{" "}
          <Link href="/login?next=/exams/setup" className="font-semibold text-primary">
            Log in to start an exam
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
