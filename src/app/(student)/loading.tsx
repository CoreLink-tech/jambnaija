import { LoadingState } from "@/components/ui/feedback";

export default function StudentLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <LoadingState label="Loading your workspace…" />
    </div>
  );
}
