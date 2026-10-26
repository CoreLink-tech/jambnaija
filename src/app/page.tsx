import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(29,78,216,0.18), transparent), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(15,118,110,0.12), transparent)",
        }}
      />
      <div className="relative z-10 w-full max-w-lg space-y-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          JAMB UTME prep
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-primary-strong sm:text-5xl">
          Jambnaija
        </h1>
        <p className="text-base text-muted sm:text-lg">
          Study with explanations and take timed CBT practice built for Nigerian
          students.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/register" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">Get started</Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full sm:w-auto">
              Log in
            </Button>
          </Link>
        </div>
        <p className="text-xs text-muted">
          Secure accounts · Premium study mode · Server-scored CBT
        </p>
      </div>
    </main>
  );
}
