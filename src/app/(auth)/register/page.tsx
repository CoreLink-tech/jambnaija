import { RegisterForm } from "@/components/student/register-form";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <RegisterForm />
    </div>
  );
}
