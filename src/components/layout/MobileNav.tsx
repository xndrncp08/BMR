"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";
import { NAV_LINKS, REFILL_CTA } from "@/lib/navigation";

interface MobileNavProps {
  id: string;
  isOpen: boolean;
  onNavigate: () => void;
}

export function MobileNav({ id, isOpen, onNavigate }: MobileNavProps) {
  return (
    <div
      id={id}
      className={cn(
        "overflow-hidden transition-[max-height] duration-300 ease-in-out md:hidden",
        isOpen ? "max-h-96" : "max-h-0"
      )}
    >
      <nav
        aria-label="Mobile"
        className="flex flex-col gap-1 border-t border-neutral-100 bg-white px-4 py-4"
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className="rounded-md px-3 py-2 text-base font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href={REFILL_CTA.href}
          onClick={onNavigate}
          className={cn(buttonVariants({ variant: "secondary" }), "mt-2 w-full")}
        >
          {REFILL_CTA.label}
        </Link>
      </nav>
    </div>
  );
}
