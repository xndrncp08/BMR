import type { ZodError } from "zod";

/** First error message per field, from a failed zod parse. */
export function toFieldErrors<T extends Record<string, unknown>>(error: ZodError) {
  const fieldErrors: Partial<Record<keyof T, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof T;
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

/**
 * Moves focus to the first field (in DOM order) that has an error, so
 * keyboard and screen-reader users land right where they need to fix it.
 */
export function focusFirstInvalid(form: HTMLFormElement | null, fields: readonly string[]) {
  if (!form) return;
  for (const name of fields) {
    const el = form.querySelector<HTMLElement>(`#${CSS.escape(name)}`);
    if (el) {
      el.focus();
      return;
    }
  }
}
