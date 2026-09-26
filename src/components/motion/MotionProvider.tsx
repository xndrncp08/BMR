"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * Makes every Framer Motion animation in the app honor the OS-level
 * "reduce motion" setting: transforms are skipped, opacity still fades.
 * The CSS side is handled by the prefers-reduced-motion rule in globals.css.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </MotionConfig>
  );
}
