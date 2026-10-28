import { Suspense } from "react";
import { SubscriptionView } from "@/components/student/subscription-view";

export const metadata = { title: "Subscription" };

export default function SubscriptionPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
      <SubscriptionView />
    </Suspense>
  );
}
