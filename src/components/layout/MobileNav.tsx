"use client";

import Link from "next/link";
import { ArrowRight, Clock, Phone, Pill } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";
import { Dialog } from "@/components/ui/Dialog";
import { BUSINESS } from "@/lib/business";
import { NAV_LINKS, REFILL_CTA, isActivePath } from "@/lib/navigation";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
}

/**
 * Slide-in sheet on a native modal <dialog>: focus is trapped while open,
 * Escape and backdrop clicks close it, and focus returns to the menu
 * button afterwards. Links are only in the tab order while it's open.
 */
export function MobileNav({ open, onOpenChange, pathname }: MobileNavProps) {
  const close = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} title="Menu" variant="sheet">
      <div className="flex h-full flex-col px-4 pb-6 pt-4">
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {NAV_LINKS.map((link, index) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li
                  key={link.href}
                  className="animate-rise"
                  style={{ animationDelay: `${80 + index * 40}ms` }}
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "focus-ring group flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg font-semibold transition-colors",
                      active
                        ? "bg-primary-50 text-primary-800"
                        : "text-neutral-800 hover:bg-neutral-100",
                    )}
                  >
                    {link.label}
                    <ArrowRight
                      className={cn(
                        "size-5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1",
                        active ? "text-primary-600" : "text-neutral-400",
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto space-y-4 pt-8">
          <Link
            href={REFILL_CTA.href}
            onClick={close}
            className={cn(buttonVariants({ variant: "accent", size: "lg" }), "w-full")}
          >
            <Pill aria-hidden="true" />
            {REFILL_CTA.label}
          </Link>
          <div className="rounded-2xl bg-neutral-50 p-4 text-sm">
            <p className="flex items-center gap-2 font-semibold text-neutral-900">
              <Clock className="size-4 text-primary-600" aria-hidden="true" />
              {BUSINESS.hours.long}
            </p>
            <a
              href={BUSINESS.phone.href}
              className="focus-ring mt-2 flex items-center gap-2 rounded text-neutral-700 hover:text-primary-700"
            >
              <Phone className="size-4 text-primary-600" aria-hidden="true" />
              {BUSINESS.phone.display}
            </a>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
