"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert } from "lucide-react";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

/** IDs FormField renders its hint/error under, for aria-describedby. */
export function fieldIds(htmlFor: string) {
  return { hint: `${htmlFor}-hint`, error: `${htmlFor}-error` };
}

/**
 * Spread onto the input inside a <FormField> so screen readers announce the
 * hint or error with the field and know when it's invalid.
 */
export function fieldA11y(htmlFor: string, { error, hint }: { error?: string; hint?: string }) {
  const ids = fieldIds(htmlFor);
  const describedBy = error ? ids.error : hint ? ids.hint : undefined;
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
  } as const;
}

export function FormField({ label, htmlFor, error, hint, required, children }: FormFieldProps) {
  const ids = fieldIds(htmlFor);
  return (
    <div>
      <label htmlFor={htmlFor} className="flex items-baseline gap-1 text-sm font-semibold text-neutral-800">
        {label}
        {required ? (
          <span className="text-accent-600" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-neutral-500">Optional</span>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {hint && !error && (
        <p id={ids.hint} className="mt-2 text-sm text-neutral-500">
          {hint}
        </p>
      )}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            key="error"
            id={ids.error}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 flex items-center gap-1.5 text-sm font-medium text-error"
          >
            <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
