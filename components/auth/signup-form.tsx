"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup } from "@/app/signup/actions";
import { initialAuthActionState } from "@/lib/validation/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm() {
  const [state, formAction, pending] = useActionState(
    signup,
    initialAuthActionState
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
      </div>
      {state.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
      {state.message && (
        <p className="text-sm text-muted-foreground">{state.message}</p>
      )}
      <Button type="submit" disabled={pending}>
        {pending ? "Creating account..." : "Sign up"}
      </Button>
      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </form>
  );
}
