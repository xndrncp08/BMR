import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui";
import { NAV_LINKS } from "@/lib/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-bold text-white">BMR Pharmacy</p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              Trusted prescriptions, expert consultations, and wellness products for
              your community.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Hours
            </h3>
            <ul className="mt-4 space-y-1 text-sm text-neutral-400">
              <li>Mon–Fri: 8:00 AM – 8:00 PM</li>
              <li>Saturday: 9:00 AM – 6:00 PM</li>
              <li>Sunday: 10:00 AM – 4:00 PM</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                <span>123 Main Street, Your City, ST 00000</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                <a href="tel:+10000000000" className="hover:text-secondary">
                  (000) 000-0000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                <a href="mailto:info@bmrpharmacy.com" className="hover:text-secondary">
                  info@bmrpharmacy.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-neutral-700 pt-6 text-sm text-neutral-500 sm:flex-row">
          <p>© {year} BMR Pharmacy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-secondary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-secondary">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
