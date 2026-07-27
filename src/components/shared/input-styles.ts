import { cn } from "@/lib/utils";

export function getInputClassName(hasError?: boolean) {
  return cn(
    "w-full rounded-md border px-3 py-2 text-sm text-neutral-900 shadow-sm transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-primary/20",
    hasError
      ? "border-error focus:border-error"
      : "border-neutral-300 focus:border-primary",
  );
}
