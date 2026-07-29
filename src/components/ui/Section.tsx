import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("w-full py-16 sm:py-20 lg:py-24", {
  variants: {
    tone: {
      default: "bg-page",
      muted: "bg-neutral-100",
      primary: "bg-primary-light",
      secondary: "bg-secondary-light",
      vivid: "bg-hero-mesh",
      vividAlt: "bg-hero-mesh-alt",
      dark: "bg-neutral-900 text-white",
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