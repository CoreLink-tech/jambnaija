import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Card } from "@/components/ui/card";

export const metadata = { title: "FAQ" };

const faqs = [
  {
    q: "Are these official JAMB past questions?",
    a: "The current bank is labelled original practice. Official past questions are only included when provenance and permission are verified. We never present invented items as official papers.",
  },
  {
    q: "Is the percentage score my JAMB aggregate?",
    a: "No. Results show practice percentages and subject breakdowns. They are not official UTME aggregates.",
  },
  {
    q: "Can I take multi-subject exams?",
    a: "Yes. Choose one or more subjects on the exam setup page and start a timed session.",
  },
  {
    q: "What happens if I refresh during an exam?",
    a: "Your session and deadline are stored on the server. Reloading resumes the same attempt without resetting the timer.",
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
        <h1 className="text-2xl font-bold text-primary-strong">FAQ</h1>
        {faqs.map((f) => (
          <Card key={f.q} className="space-y-2">
            <h2 className="font-semibold">{f.q}</h2>
            <p className="text-sm text-muted leading-relaxed">{f.a}</p>
          </Card>
        ))}
      </main>
      <SiteFooter />
    </div>
  );
}
