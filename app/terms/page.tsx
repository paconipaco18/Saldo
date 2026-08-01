import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center px-5 py-16 sm:px-8">
        <div className="w-full max-w-2xl">
          <Link
            href="/"
            className="block text-center text-base font-semibold tracking-tight text-primary"
          >
            Saldo
          </Link>
          <div className="mt-10">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Terms of Service
            </h1>
            <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                This is a placeholder Terms of Service page. Saldo
                doesn&apos;t have finalized terms yet — a complete version
                will be published here before the product launches publicly.
              </p>
              <p>
                In the meantime, Saldo is offered as-is while it&apos;s in
                active development, and features (including the AI reminder
                drafting feature) may change before launch.
              </p>
              <p>
                Questions in the meantime? Reach out and we&apos;ll be happy
                to answer them directly.
              </p>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
