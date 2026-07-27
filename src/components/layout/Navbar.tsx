"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container, buttonVariants } from "@/components/ui";
import { cn } from "@/lib/utils";
import { NAV_LINKS, REFILL_CTA } from "@/lib/navigation";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu automatically whenever the route changes,
  // so it never stays open after a link is followed.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link href="/" className="font-display text-xl font-extrabold text-primary">
            BMR <span className="font-normal text-neutral-700">Pharmacy</span>
          </Link>

          <nav aria-label="Main" className="hidden md:flex md:items-center md:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-700 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href={REFILL_CTA.href} className={buttonVariants({ variant: "secondary" })}>
              {REFILL_CTA.label}
            </Link>
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-50 md:hidden"
            )}
            aria-controls="mobile-nav"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      <MobileNav
        id="mobile-nav"
        isOpen={isMobileMenuOpen}
        onNavigate={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
