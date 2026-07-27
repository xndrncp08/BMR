import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Section, Container } from "@/components/ui";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/features/contact/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — BMR Pharmacy",
};

export default function ContactPage() {
  return (
    <Section className="pb-16 pt-10 sm:pt-16">
      <Container>
        <SectionHeading
          eyebrow="Get in Touch"
          title="Contact Us"
          description="Questions about a prescription, a product, or anything else — we're here to help."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold text-neutral-900">Visit Us</p>
                <p className="text-sm text-neutral-500">123 Main Street, Your City, ST 00000</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold text-neutral-900">Call Us</p>
                <a href="tel:+10000000000" className="text-sm text-neutral-500 hover:text-primary">
                  (000) 000-0000
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold text-neutral-900">Email Us</p>
                <a href="mailto:info@bmrpharmacy.com" className="text-sm text-neutral-500 hover:text-primary">
                  info@bmrpharmacy.com
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
