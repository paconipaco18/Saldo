import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">Saldo</h1>
      <p className="mt-3 max-w-md text-lg text-muted-foreground">
        Get paid faster — track unpaid invoices and let AI draft the
        follow-up.
      </p>
      <div className="mt-8 flex gap-3">
        <Button render={<Link href="/signup" />}>Sign up</Button>
        <Button render={<Link href="/login" />} variant="outline">
          Sign in
        </Button>
      </div>
    </div>
  );
}
