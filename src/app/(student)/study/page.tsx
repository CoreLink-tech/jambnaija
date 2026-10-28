import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/feedback";

export const metadata = { title: "Study" };

export default function StudyPage() {
  return (
    <div className="mx-auto max-w-xl space-y-4">
      <PageHeader
        title="Study mode"
        description="Topic-based practice with explanations. Premium required."
      />
      <Card className="space-y-4">
        <p className="text-sm text-muted">
          Study mode is not available yet. Timed CBT practice is ready on the Exams
          page.
        </p>
        <Button disabled className="w-full sm:w-auto">
          Coming soon
        </Button>
      </Card>
    </div>
  );
}
