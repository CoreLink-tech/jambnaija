import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-primary-strong font-[family-name:var(--font-display)]">
          Jambnaija
        </h1>
        <p className="text-muted text-lg">
          JAMB UTME preparation — study mode and CBT practice for Nigerian
          students.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/register">
            <Button className="w-full sm:w-auto">Get started</Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" className="w-full sm:w-auto">
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
