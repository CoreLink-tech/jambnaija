import { ActivationForm } from "@/components/student/activation-form";

export const metadata = { title: "Activation" };

export default function ActivationPage() {
  return (
    <div className="py-4">
      <ActivationForm />
    </div>
  );
}
