import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  )
);
Container.displayName = "Container";

export { Container };
