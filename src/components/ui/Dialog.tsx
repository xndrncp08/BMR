"use client";

import { useCallback, useEffect, useId, useRef, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Accessible name; rendered as the visible heading unless `hideTitle`. */
  title: string;
  hideTitle?: boolean;
  description?: string;
  /** `modal` is a centered card; `sheet` slides in from the right edge. */
  variant?: "modal" | "sheet";
  className?: string;
  children: ReactNode;
}

/**
 * Built on the native <dialog> element opened with showModal(), which gives
 * us — for free and correctly — a focus trap, Escape to close, an inert
 * background, top-layer stacking, and focus restoration on close.
 *
 * Enter/exit animations live in globals.css. Closing sets [data-closing],
 * waits for the exit animation, then calls dialog.close().
 *
 * Portaled to <body> so parent layout utilities (e.g. `space-y-*`, which
 * sets sibling margins) can't override the dialog's centering `margin: auto`.
 */
const noopSubscribe = () => () => {};

export function Dialog({
  open,
  onOpenChange,
  title,
  hideTitle = false,
  description,
  variant = "modal",
  className,
  children,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  // false during SSR and hydration, true afterwards — portals need document
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.removeAttribute("data-closing");
      dialog.showModal();
      return;
    }

    if (!open && dialog.open) {
      dialog.setAttribute("data-closing", "");
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        dialog.removeAttribute("data-closing");
        dialog.close();
      };
      dialog.addEventListener("animationend", finish, { once: true });
      // Fallback in case animationend never fires (e.g. display changes)
      const timeout = window.setTimeout(finish, 320);
      return () => {
        window.clearTimeout(timeout);
        dialog.removeEventListener("animationend", finish);
      };
    }
  }, [open, isClient]);

  const requestClose = useCallback(() => onOpenChange(false), [onOpenChange]);

  if (!isClient) return null;

  return createPortal(
    <dialog
      ref={ref}
      data-variant={variant}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      // Escape: route through React state so the exit animation plays
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      // Clicks on the ::backdrop target the <dialog> element itself
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
      className={cn(
        "bmr-dialog bg-white p-0 text-neutral-900 shadow-lift",
        variant === "modal" &&
          "w-[min(44rem,calc(100vw-2rem))] max-w-none rounded-3xl max-h-[calc(100dvh-2rem)]",
        variant === "sheet" &&
          "my-0 ml-auto mr-0 h-dvh max-h-none w-[min(24rem,calc(100vw-3rem))] max-w-none",
        className,
      )}
    >
      <div className="flex h-full max-h-[inherit] flex-col">
        <div
          className={cn(
            "flex items-start justify-between gap-4 px-6 pt-5",
            hideTitle && "absolute right-0 top-0 z-10",
          )}
        >
          <div className={cn(hideTitle && "sr-only")}>
            <h2 id={titleId} className="font-display text-lg font-bold tracking-tight">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="mt-1 text-sm text-neutral-600">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={requestClose}
            className="focus-ring -mr-2 grid size-10 shrink-0 place-items-center rounded-full bg-white/80 text-neutral-600 backdrop-blur transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            aria-label="Close"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
      </div>
    </dialog>,
    document.body,
  );
}
