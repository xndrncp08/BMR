import { cn } from "@/lib/utils";

/**
 * Shared field styling. 16px text prevents iOS Safari from zooming on
 * focus; the neutral-400 border meets the 3:1 non-text contrast minimum.
 */
export function getInputClassName(hasError?: boolean) {
  return cn(
    "block w-full rounded-xl border bg-white px-4 py-3 text-base text-neutral-900 shadow-xs",
    "placeholder:text-neutral-500 transition-[border-color,box-shadow] duration-200",
    "focus:outline-none focus:ring-4",
    hasError
      ? "border-error focus:border-error focus:ring-error/15"
      : "border-neutral-400 hover:border-neutral-500 focus:border-primary-600 focus:ring-primary-600/15",
  );
}
