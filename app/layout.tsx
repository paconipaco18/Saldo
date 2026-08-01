import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://saldo.app";
const SITE_DESCRIPTION =
  "Cobra tus facturas más rápido. Saldo ayuda a pequeños negocios a llevar el control de facturas pendientes y darles seguimiento.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Saldo",
    template: "%s · Saldo",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Saldo",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Saldo",
    locale: "es",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saldo",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
