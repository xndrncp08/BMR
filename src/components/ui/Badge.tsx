import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-semibold [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        primary: "bg-primary-50 text-primary-800 ring-1 ring-inset ring-primary-200",
        accent: "bg-accent-50 text-accent-800 ring-1 ring-inset ring-accent-200",
        neutral: "bg-neutral-100 text-neutral-700 ring-1 ring-inset ring-neutral-200",
        warning: "bg-error-light text-error ring-1 ring-inset ring-error/25",
        inverse: "bg-white/10 text-white ring-1 ring-inset ring-white/20 backdrop-blur",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs",
        md: "px-3 py-1 text-[0.8125rem]",
      },
    },
    defaultVariants: {
      tone: "primary",
      size: "sm",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone, size }), className)} {...props} />;
}

/** A small "live" dot with a soft ping — used for Open 24/7 indicators. */
export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex size-2", className)} aria-hidden="true">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary-400 opacity-75" />
      <span className="relative inline-flex size-2 rounded-full bg-primary-400" />
    </span>
  );
}

export { badgeVariants };
