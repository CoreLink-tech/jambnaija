import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogoMark, IconBook, IconClock, IconChart } from "@/components/icons/brand";
import { SUBJECT_META, SUBJECTS } from "@/data/questions/types";
import { bankStats } from "@/data/questions";

export default function HomePage() {
  const stats = bankStats();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-line bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center md:py-20">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                UTME practice platform
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-primary-strong sm:text-4xl lg:text-5xl">
                Practise JAMB-style exams with a clear CBT experience
              </h1>
              <p className="max-w-xl text-base text-muted sm:text-lg">
                Choose subjects, set your year range, sit a timed paper, and review
                every answer with explanations. Built for focused preparation — not
                guesswork.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/exams/setup">
                  <Button className="w-full sm:w-auto">Start practising</Button>
                </Link>
                <Link href="/subjects">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Explore subjects
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-muted">
                {stats.total} practice questions in the bank · Use of English, Maths,
                Physics, Chemistry, Biology
              </p>
            </div>
            <Card className="space-y-4 border-primary/15 shadow-[var(--shadow-md)]">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-primary">CBT preview</span>
                <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary">
                  59:12
                </span>
              </div>
              <p className="text-sm font-medium leading-relaxed">
                The SI unit of force is the
              </p>
              <div className="space-y-2">
                {["joule", "newton", "watt", "pascal"].map((opt, i) => (
                  <div
                    key={opt}
                    className={`rounded-[var(--radius-md)] border px-3 py-2.5 text-sm ${
                      i === 1
                        ? "border-primary bg-primary-soft"
                        : "border-line bg-surface-warm"
                    }`}
                  >
                    <span className="mr-2 font-semibold text-muted">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-1">
                <div className="h-2 flex-1 rounded-full bg-primary" />
                <div className="h-2 flex-1 rounded-full bg-line" />
                <div className="h-2 flex-1 rounded-full bg-line" />
              </div>
            </Card>
          </div>
        </section>

        {/* Subjects */}
        <section className="mx-auto max-w-6xl px-4 py-14" id="subjects">
          <div className="mb-8 space-y-2">
            <h2 className="text-2xl font-bold text-primary-strong">Subjects</h2>
            <p className="text-sm text-muted">
              Practise one subject or combine several in a single timed session.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SUBJECTS.map((s) => (
              <Link key={s} href={`/subjects/${s}`}>
                <Card className="h-full transition hover:border-primary/30 hover:shadow-[var(--shadow-sm)]">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary-soft p-2 text-primary">
                      <IconBook />
                    </div>
                    <div>
                      <h3 className="font-semibold">{SUBJECT_META[s].name}</h3>
                      <p className="mt-1 text-sm text-muted">
                        Years 2020–2026 · practice items
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="mb-8 text-2xl font-bold text-primary-strong">How it works</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: <IconBook className="text-primary" />,
                  title: "Configure",
                  text: "Pick subjects, year range, and question count. See how many items are available before you start.",
                },
                {
                  icon: <IconClock className="text-primary" />,
                  title: "Sit the paper",
                  text: "Answer under a server-backed timer. Navigate, flag questions, and submit when ready — or when time ends.",
                },
                {
                  icon: <IconChart className="text-primary" />,
                  title: "Review",
                  text: "See scores by subject, open explanations, and filter correct, wrong, or unanswered items.",
                },
              ].map((item) => (
                <Card key={item.title} className="space-y-3">
                  <div className="w-fit rounded-lg bg-primary-soft p-2">{item.icon}</div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="mb-6 text-2xl font-bold text-primary-strong">Built for serious practice</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "Multi-subject timed examinations",
              "Question palette with answered / unanswered states",
              "Server-authoritative deadline (refresh-safe)",
              "Detailed answer review with explanations",
              "Subject-level score breakdown",
              "Version-controlled practice question bank",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-muted">
                <LogoMark className="mt-0.5 h-5 w-5 shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ teaser */}
        <section className="border-t border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-bold text-primary-strong">Questions?</h2>
                <p className="mt-1 text-sm text-muted">
                  Learn how scoring works and what the question bank contains.
                </p>
              </div>
              <Link href="/faq">
                <Button variant="secondary">Read the FAQ</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
