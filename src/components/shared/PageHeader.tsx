import type { ReactNode } from "react";
import { Container } from "@/components/ui";
import { Eyebrow } from "./SectionHeading";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/**
 * Top-of-page banner for interior pages. Animates with CSS (not Framer) so
 * the h1 — usually the LCP element — is never hidden waiting on hydration.
 */
export function PageHeader({ eyebrow, title, description, children, className }: PageHeaderProps) {
  return (
    <header className={cn("relative overflow-hidden border-b border-neutral-200 bg-white", className)}>
      <div className="bg-dot-grid mask-radial absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute -right-32 -top-40 size-[28rem] rounded-full bg-primary-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -left-40 top-10 size-72 rounded-full bg-accent-100/60 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative py-14 sm:py-20">
        <div className="max-w-3xl">
          <div className="animate-rise">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 className="animate-rise delay-1 mt-4 font-display text-display-lg font-extrabold text-neutral-900">
            {title}
          </h1>
          {description && (
            <p className="animate-rise delay-2 mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
              {description}
            </p>
          )}
          {children && <div className="animate-rise delay-3 mt-8">{children}</div>}
        </div>
      </Container>
    </header>
  );
}
