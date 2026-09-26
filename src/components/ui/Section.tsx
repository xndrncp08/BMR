import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("relative w-full", {
  variants: {
    tone: {
      default: "bg-page",
      white: "bg-white",
      muted: "bg-neutral-50",
      tint: "bg-primary-50/60",
      dark: "bg-primary-950 text-white",
    },
    spacing: {
      none: "",
      sm: "py-12 sm:py-16",
      md: "py-16 sm:py-20 lg:py-24",
      lg: "py-20 sm:py-24 lg:py-32",
    },
  },
  defaultVariants: {
    tone: "default",
    spacing: "md",
  },
});

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, tone, spacing, ...props }, ref) => (
    <section ref={ref} className={cn(sectionVariants({ tone, spacing }), className)} {...props} />
  ),
);
Section.displayName = "Section";

export { Section, sectionVariants };
