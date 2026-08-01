import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-5 py-16 sm:px-8">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="block text-center text-base font-semibold tracking-tight text-primary"
        >
          Saldo
        </Link>
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-7">
          <h1 className="text-xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-1 mb-6 text-sm text-muted-foreground">
            Welcome back. Enter your details to continue.
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
