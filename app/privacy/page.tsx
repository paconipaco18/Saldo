import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                This is a placeholder Privacy Policy page. Saldo doesn&apos;t
                have a finalized privacy policy yet — a complete version will
                be published here before the product launches publicly.
              </p>
              <p>
                In the meantime, know that Saldo only stores the invoice and
                account data you enter yourself, and it&apos;s used solely to
                provide the app&apos;s core features to you.
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
