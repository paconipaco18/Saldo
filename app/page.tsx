import Link from "next/link";
import { ClockIcon, FileTextIcon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: FileTextIcon,
    title: "Todo en un lugar",
    body: "Registrá cada factura con monto, moneda y fecha de vencimiento. Sin planillas sueltas.",
  },
  {
    icon: ClockIcon,
    title: "Sabé a quién cobrar",
    body: "Saldo marca automáticamente lo vencido y lo que vence pronto, ordenado por urgencia.",
  },
  {
    icon: SparklesIcon,
    title: "Recordatorios con IA",
    body: "Mensajes de seguimiento redactados por vos, en el idioma y el tono correctos.",
    badge: "Próximamente",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <span className="text-base font-semibold tracking-tight text-primary">
            Saldo
          </span>
          <div className="flex items-center gap-2">
            <Button
              render={<Link href="/login" />}
              nativeButton={false}
              variant="ghost"
              size="sm"
            >
              Sign in
            </Button>
            <Button
              render={<Link href="/signup" />}
              nativeButton={false}
              size="sm"
            >
              Sign up
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_58%_50%_at_50%_0%,color-mix(in_oklch,var(--primary)_20%,transparent),transparent_70%)]"
          />
          <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-24 text-center sm:px-8 sm:py-32">
            <span className="inline-flex items-center rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground">
              Para freelancers y pequeños negocios
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Cobra tus facturas más rápido
            </h1>
            <p className="mt-6 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
              Saldo te ayuda a llevar el control de tus facturas pendientes y a
              darles seguimiento a tiempo, sin perseguir a nadie de memoria.
            </p>
            <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                render={<Link href="/signup" />}
                nativeButton={false}
                size="lg"
              >
                Empezar gratis
              </Button>
              <Button
                render={<Link href="/login" />}
                nativeButton={false}
                variant="outline"
                size="lg"
              >
                Ya tengo cuenta
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, body, badge }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <Icon className="size-5" />
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <h2 className="font-medium tracking-tight">{title}</h2>
                  {badge && (
                    <span className="rounded-full border border-border px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground">
                      {badge}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:px-8">
          <span className="font-medium text-foreground">Saldo</span>
          <span>Cobra tus facturas más rápido.</span>
        </div>
      </footer>
    </div>
  );
}
