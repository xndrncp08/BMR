import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Heading level — pages should have exactly one h1. */
  as?: "h1" | "h2";
  tone?: "default" | "inverse";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  tone = "default",
  className,
}: SectionHeadingProps) {
  const inverse = tone === "inverse";
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Heading
        className={cn(
          "mt-3 font-display font-bold",
          Heading === "h1" ? "text-display-lg" : "text-display-md",
          inverse ? "text-white" : "text-neutral-900",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            inverse ? "text-primary-100/80" : "text-neutral-600",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function Eyebrow({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "inverse";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]",
        tone === "inverse" ? "text-primary-300" : "text-primary-700",
        className,
      )}
    >
      <span
        className={cn("h-px w-6", tone === "inverse" ? "bg-primary-300" : "bg-accent-500")}
        aria-hidden="true"
      />
      {children}
    </p>
  );
}
