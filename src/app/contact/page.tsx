import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Section, Container } from "@/components/ui";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ContactForm } from "@/features/contact/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — BMR Pharmacy",
};

export default function ContactPage() {
  return (
    <Section className="pb-16 pt-10 sm:pt-16">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Get in Touch"
            title="Contact Us"
            description="Questions about a prescription, a product, or anything else — we're here to help, 24 hours a day."
          />
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-5">
          <Reveal direction="left" className="space-y-6 lg:col-span-2">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold text-neutral-900">Visit Us</p>
                <p className="text-sm text-neutral-500">
                  81 T. Claudio Street, Barangay San Juan Poblacion, Morong, Rizal 1960,
                  Philippines
                </p>
                <p className="mt-1 text-xs text-neutral-400">
                  Near Namay Bridge, across from Let&apos;s Buy, ground floor below Beauty by
                  Zcharina Aesthetic Clinic
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold text-neutral-900">Hours</p>
                <p className="text-sm text-neutral-500">Open 24 Hours — Monday to Sunday</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold text-neutral-900">Call Us</p>
                <a href="tel:+639753737338" className="text-sm text-neutral-500 hover:text-primary">
                  +63 975 373 7338
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold text-neutral-900">Email Us</p>
                <a
                  href="mailto:info@bmrpharmacy.com"
                  className="text-sm text-neutral-500 hover:text-primary"
                >
                  info@bmrpharmacy.com
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}