import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared by <Button> and by <Link>s that should look like buttons
 * (`className={buttonVariants({ ... })}`), so every call-to-action on the
 * site gets the same hover, press, focus, and disabled treatment.
 */
const buttonStyles = cva(
  "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-xl font-body font-semibold " +
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out-quart " +
    "active:scale-[0.97] focus-ring " +
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 " +
    "[&_svg]:size-[1.1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-600 text-white shadow-soft hover:bg-primary-700 hover:shadow-lift",
        accent:
          "bg-accent-600 text-white shadow-soft hover:bg-accent-700 hover:shadow-lift focus-visible:ring-accent-500",
        secondary:
          "border border-primary-200 bg-primary-50 text-primary-800 hover:border-primary-300 hover:bg-primary-100",
        outline:
          "border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50",
        ghost: "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900",
        inverse:
          "bg-white text-primary-900 shadow-soft hover:bg-primary-50 focus-visible:ring-white focus-visible:ring-offset-primary-950",
        "inverse-outline":
          "border border-white/30 text-white hover:border-white/50 hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-primary-950",
        link: "text-primary-700 underline-offset-4 hover:text-primary-800 hover:underline active:scale-100",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        md: "h-11 px-5 text-[0.9375rem]",
        lg: "h-[3.25rem] px-7 text-base",
        icon: "size-10 p-0",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

/** Merged so compound/override classes reliably win over size classes. */
function buttonVariants(props?: VariantProps<typeof buttonStyles>) {
  return cn(buttonStyles(props));
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  /** Shows a spinner, disables the button, and sets aria-busy. */
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && <LoaderCircle className="animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
