"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";

interface SuccessPanelProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

/**
 * Confirmation state for forms. The heading receives focus on mount so
 * screen-reader users hear the result (the form they were in is gone).
 */
export function SuccessPanel({ title, children, action }: SuccessPanelProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center rounded-3xl border border-primary-200 bg-primary-50/70 px-6 py-12 text-center"
    >
      <motion.svg
        viewBox="0 0 52 52"
        className="size-16 text-primary-600"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.1 }}
        aria-hidden="true"
      >
        <circle cx="26" cy="26" r="25" fill="currentColor" />
        <motion.path
          d="M15 27 l7 7 l15 -16"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, delay: 0.35, ease: [0.65, 0, 0.35, 1] }}
        />
      </motion.svg>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 font-display text-2xl font-bold tracking-tight text-primary-900 outline-none"
      >
        {title}
      </h2>
      <div className="mt-2 max-w-sm text-primary-900/80">{children}</div>
      {action && <div className="mt-8">{action}</div>}
    </motion.div>
  );
}
