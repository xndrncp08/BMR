import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge needs to know about custom theme keys, otherwise it
 * misclassifies them — e.g. `text-display-xl` would be read as a text
 * *color* and silently dropped when combined with `text-white`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-xl", "display-lg", "display-md"] }],
      shadow: [{ shadow: ["xs", "soft", "lift", "glow", "inner-line"] }],
    },
  },
});

/**
 * Combines clsx (conditional class logic) with tailwind-merge (conflict
 * resolution between Tailwind utility classes). Every component in
 * src/components/ui accepts a `className` prop and should pass it
 * through this function so consumers can safely override styles.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
