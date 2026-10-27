import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Card } from "@/components/ui/card";
import { SUBJECT_META, SUBJECTS } from "@/data/questions/types";
import { filterQuestions } from "@/data/questions";

export const metadata = { title: "Subjects" };

export default function SubjectsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold text-primary-strong">Subjects</h1>
        <p className="mt-1 text-sm text-muted">
          All items are labelled original practice unless verified otherwise.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((s) => {
            const n = filterQuestions({ subjects: [s] }).length;
            return (
              <Link key={s} href={`/subjects/${s}`}>
                <Card className="h-full hover:border-primary/30">
                  <h2 className="font-semibold">{SUBJECT_META[s].name}</h2>
                  <p className="mt-1 text-sm text-muted">{n} questions · 2020–2026</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
