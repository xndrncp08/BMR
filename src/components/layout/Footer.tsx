import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone, Pill } from "lucide-react";
import { Container, buttonVariants } from "@/components/ui";
import { cn } from "@/lib/utils";
import { BUSINESS } from "@/lib/business";
import { NAV_LINKS, REFILL_CTA } from "@/lib/navigation";
import { Logo } from "./Logo";

const footerLink =
  "focus-ring rounded text-primary-100/75 transition-colors hover:text-white focus-visible:ring-offset-primary-950";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-primary-950 text-primary-100">
      <div className="bg-dot-grid-inverse absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-48 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-primary-600/25 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        {/* CTA strip */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 py-12 md:flex-row md:items-center">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Running low on your medicine?
            </p>
            <p className="mt-2 text-primary-100/75">
              Request a refill online. We&apos;ll let you know the moment it&apos;s ready.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={REFILL_CTA.href} className={buttonVariants({ variant: "accent", size: "lg" })}>
              <Pill aria-hidden="true" />
              {REFILL_CTA.label}
            </Link>
            <a href={BUSINESS.phone.href} className={buttonVariants({ variant: "inverse-outline", size: "lg" })}>
              <Phone aria-hidden="true" />
              Call us
            </a>
          </div>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="inverse" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-100/75">
              A locally owned, family-operated community pharmacy in Morong, Rizal — serving with
              trust, integrity, and compassionate care since {BUSINESS.founded}.
            </p>
          </div>

          <nav aria-labelledby="footer-explore" className="lg:col-span-2">
            <h2 id="footer-explore" className="text-xs font-bold uppercase tracking-[0.14em] text-white">
              Explore
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white">Visit</h2>
            <address className="mt-5 space-y-3 text-sm not-italic">
              <p className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary-300" aria-hidden="true" />
                <span className="text-primary-100/75">
                  {BUSINESS.address.street}, {BUSINESS.address.city}
                </span>
              </p>
              <a
                href={BUSINESS.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(footerLink, "inline-flex items-center gap-1 pl-6 font-semibold text-white")}
              >
                Get directions
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </address>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Clock className="size-4 shrink-0 text-primary-300" aria-hidden="true" />
                <span className="text-primary-100/75">{BUSINESS.hours.long}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-primary-300" aria-hidden="true" />
                <a href={BUSINESS.phone.href} className={footerLink}>
                  {BUSINESS.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-primary-300" aria-hidden="true" />
                <a href={BUSINESS.email.href} className={footerLink}>
                  {BUSINESS.email.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-primary-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {BUSINESS.name}. All rights reserved.
          </p>
          <p>Licensed community pharmacy · Morong, Rizal, Philippines</p>
        </div>
      </Container>
    </footer>
  );
}
