import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines clsx (conditional class logic) with tailwind-merge (conflict
 * resolution between Tailwind utility classes). Every component in
 * src/components/ui accepts a `className` prop and should pass it
 * through this function so consumers can safely override styles.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
