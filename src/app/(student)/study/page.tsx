import { Suspense } from "react";
import { StudyView } from "@/components/student/study-view";

export const metadata = { title: "Study" };

export default function StudyPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading study…</p>}>
      <StudyView />
    </Suspense>
  );
}
