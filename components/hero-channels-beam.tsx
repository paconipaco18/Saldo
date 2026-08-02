"use client";

import { useRef } from "react";
import { MailIcon, MessageCircleIcon } from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";

function ChannelNode({
  ref,
  className,
  children,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex items-center justify-center rounded-full border border-border bg-card text-primary",
        className
      )}
    >
      {children}
    </div>
  );
}

export function HeroChannelsBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const whatsappRef = useRef<HTMLDivElement>(null);
  const saldoRef = useRef<HTMLDivElement>(null);
  const mailRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-16 flex w-full flex-col items-center">
      <div
        ref={containerRef}
        className="relative flex h-[220px] w-full max-w-lg items-center justify-between px-4 sm:h-[260px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="h-40 w-40 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_28%,transparent),transparent_70%)] sm:h-48 sm:w-48" />
        </div>

        <ChannelNode ref={whatsappRef} className="size-14 sm:size-16">
          <MessageCircleIcon className="size-6" />
        </ChannelNode>

        <ChannelNode
          ref={saldoRef}
          className="size-20 border-primary/40 sm:size-24"
        >
          <span className="text-lg font-semibold tracking-tight sm:text-xl">
            Saldo
          </span>
        </ChannelNode>

        <ChannelNode ref={mailRef} className="size-14 sm:size-16">
          <MailIcon className="size-6" />
        </ChannelNode>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={saldoRef}
          toRef={whatsappRef}
          curvature={40}
          reverse
          duration={5}
          gradientStartColor="var(--primary)"
          gradientStopColor="var(--primary)"
          pathColor="var(--border)"
          pathOpacity={1}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={saldoRef}
          toRef={mailRef}
          curvature={-40}
          duration={6.5}
          gradientStartColor="var(--primary)"
          gradientStopColor="var(--primary)"
          pathColor="var(--border)"
          pathOpacity={1}
        />
      </div>

      <span className="mt-6 inline-flex items-center rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground">
        Próximamente
      </span>
      <p className="mt-3 max-w-sm text-center text-sm text-muted-foreground">
        Así vamos a poder enviar tus recordatorios: por WhatsApp y por email,
        automáticamente.
      </p>
    </div>
  );
}
