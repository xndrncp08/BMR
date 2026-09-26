"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Menu, Phone, Pill } from "lucide-react";
import { Container, StatusDot, buttonVariants } from "@/components/ui";
import { cn } from "@/lib/utils";
import { BUSINESS } from "@/lib/business";
import { NAV_LINKS, REFILL_CTA, isActivePath } from "@/lib/navigation";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Close the menu on any route change (including back/forward). Adjusting
  // state during render avoids an extra effect-driven re-render.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  // The sheet is mobile-only; close it if the viewport grows past `md` so the
  // page is never left inert behind a dialog the user can't see.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMobileMenuOpen(false);
    };
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 12);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Utility bar — scrolls away; the main bar below stays sticky */}
      <div className="bg-primary-950 text-[0.8125rem] text-primary-100">
        <Container className="flex h-10 items-center justify-between gap-4">
          <p className="flex items-center gap-2 font-medium">
            <StatusDot />
            <span className="sm:hidden">{BUSINESS.hours.short}</span>
            <span className="hidden sm:inline">{BUSINESS.hours.long}</span>
          </p>
          <div className="flex items-center gap-5">
            <span className="hidden items-center gap-1.5 md:flex">
              <MapPin className="size-3.5 text-primary-300" aria-hidden="true" />
              {BUSINESS.address.short}
            </span>
            <a
              href={BUSINESS.phone.href}
              className="focus-ring flex items-center gap-1.5 rounded font-semibold text-white transition-colors hover:text-primary-200 focus-visible:ring-offset-primary-950"
            >
              <Phone className="size-3.5 text-primary-300" aria-hidden="true" />
              {BUSINESS.phone.display}
            </a>
          </div>
        </Container>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
          isScrolled
            ? "border-neutral-200 bg-white/85 shadow-soft backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-white",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
            <Logo />

            <nav aria-label="Main" className="hidden md:block">
              <ul className="flex items-center gap-1">
                {NAV_LINKS.map((link) => {
                  const active = isActivePath(pathname, link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "focus-ring relative isolate block rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors",
                          active
                            ? "text-primary-800"
                            : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId="nav-active-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-primary-50 ring-1 ring-inset ring-primary-200"
                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                          />
                        )}
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href={REFILL_CTA.href}
                className={cn(buttonVariants({ variant: "accent", size: "md" }), "hidden sm:inline-flex")}
              >
                <Pill aria-hidden="true" />
                {REFILL_CTA.label}
              </Link>

              <button
                type="button"
                className={cn(buttonVariants({ variant: "outline", size: "icon" }), "md:hidden")}
                aria-haspopup="dialog"
                aria-expanded={isMobileMenuOpen}
                aria-label="Open menu"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="!size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileNav
        open={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
        pathname={pathname}
      />
    </>
  );
}
