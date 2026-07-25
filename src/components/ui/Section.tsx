import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("w-full py-16 sm:py-20 lg:py-24", {
  variants: {
    tone: {
      default: "bg-white",
      muted: "bg-neutral-50",
      primary: "bg-primary-light",
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, tone, ...props }, ref) => (
    <section ref={ref} className={cn(sectionVariants({ tone }), className)} {...props} />
  )
);
Section.displayName = "Section";

export { Section, sectionVariants };
