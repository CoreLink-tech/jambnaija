import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogoMark, IconBook, IconClock, IconChart } from "@/components/icons/brand";
import { bankStats } from "@/data/questions";
import {
  SUBSCRIPTION_PRICE_NGN,
  REFERRAL_REWARD_NGN,
} from "@/lib/validation/auth";

const TRIAL_DAYS = 3;

const STREAMS = [
  {
    key: "sciences",
    title: "Subjects in sciences",
    description: "Physics, Chemistry, Biology, and related science practice.",
  },
  {
    key: "arts",
    title: "Subjects in arts",
    description: "Literature in English, CRS, and arts-oriented preparation.",
  },
  {
    key: "social-sciences",
    title: "Subjects in social sciences",
    description: "Government and social-science focused practice.",
  },
  {
    key: "commercial",
    title: "Subjects in commercial studies",
    description: "Mathematics and commercial-stream practice pathways.",
  },
] as const;

export default function HomePage() {
  const stats = bankStats();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
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
                every answer with explanations. Start with a free trial, then unlock
                full access with a one-time activation code.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/register">
                  <Button className="w-full sm:w-auto">
                    Start free {TRIAL_DAYS}-day trial
                  </Button>
                </Link>
                <Link href="/subjects">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Explore subjects
                  </Button>
                </Link>
                <a href="/jambnaija.apk" download>
                  <Button variant="ghost" className="w-full sm:w-auto">
                    Get the app
                  </Button>
                </a>
              </div>
              <p className="text-xs text-muted">
                {stats.total} practice questions in the bank across science, arts,
                social science, and commercial pathways.
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

        <section className="border-b border-line bg-surface-warm" id="pricing">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="mb-8 space-y-2 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-primary-strong">
                Pricing & rewards
              </h2>
              <p className="text-sm text-muted max-w-2xl">
                Transparent fees. Try the platform free, then activate when you are
                ready. Share your link and earn when friends subscribe.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="space-y-3 border-primary/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Free trial
                </p>
                <p className="text-3xl font-bold text-primary-strong">
                  {TRIAL_DAYS} days
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  Full Premium access from the moment you create an account. No card
                  required. When the trial ends, redeem an activation code to continue.
                </p>
              </Card>
              <Card className="space-y-3 border-primary/30 shadow-[var(--shadow-sm)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Subscription
                </p>
                <p className="text-3xl font-bold text-primary-strong">
                  ₦{SUBSCRIPTION_PRICE_NGN.toLocaleString()}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  One-time activation code for full platform access — timed CBT exams,
                  score reviews, and subject practice. Buy via WhatsApp, then enter the
                  code in your account.
                </p>
                <Link href="/register">
                  <Button className="w-full sm:w-auto" type="button">
                    Create account
                  </Button>
                </Link>
              </Card>
              <Card className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Referral reward
                </p>
                <p className="text-3xl font-bold text-primary-strong">
                  ₦{REFERRAL_REWARD_NGN.toLocaleString()}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  Share your personal link from the Agent page. When someone you refer
                  activates a paid subscription (₦{SUBSCRIPTION_PRICE_NGN.toLocaleString()}
                  ), you earn ₦{REFERRAL_REWARD_NGN.toLocaleString()} in your wallet.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14" id="subjects">
          <div className="mb-8 space-y-2">
            <h2 className="text-2xl font-bold text-primary-strong">Subject areas</h2>
            <p className="text-sm text-muted">
              Practise by stream. Sign in to start a timed session.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {STREAMS.map((stream) => (
              <Link key={stream.key} href={`/subjects?stream=${stream.key}`}>
                <Card className="h-full transition hover:border-primary/30 hover:shadow-[var(--shadow-sm)]">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary-soft p-2 text-primary">
                      <IconBook />
                    </div>
                    <div>
                      <h3 className="font-semibold">{stream.title}</h3>
                      <p className="mt-1 text-sm text-muted">{stream.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="mb-8 text-2xl font-bold text-primary-strong">How it works</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: <IconBook className="text-primary" />,
                  title: "Configure",
                  text: "After login, pick subjects, year, and question count. Start a timed CBT session in seconds.",
                },
                {
                  icon: <IconClock className="text-primary" />,
                  title: "Sit the paper",
                  text: "Answer under a server-backed timer. Navigate, flag questions, and submit when ready.",
                },
                {
                  icon: <IconChart className="text-primary" />,
                  title: "Review",
                  text: "See scores by subject, open explanations, and filter correct or wrong items.",
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

        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="mb-6 text-2xl font-bold text-primary-strong">
            Built for serious practice
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "Multi-subject timed examinations",
              "Question palette with answered / unanswered states",
              "Server-authoritative deadline (refresh-safe)",
              "Detailed answer review with explanations",
              "Subject-level score breakdown",
              `${TRIAL_DAYS}-day free Premium trial on every new account`,
              `Activation from ₦${SUBSCRIPTION_PRICE_NGN.toLocaleString()} after trial`,
              `Earn ₦${REFERRAL_REWARD_NGN.toLocaleString()} per paid referral`,
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-muted">
                <LogoMark className="mt-0.5 h-5 w-5 shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

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
