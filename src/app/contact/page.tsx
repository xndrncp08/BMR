import type { Metadata } from "next";
import { ArrowUpRight, Clock, Mail, MapPin, Phone, Siren } from "lucide-react";
import { Container, Section } from "@/components/ui";
import { PageHeader } from "@/components/shared/PageHeader";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";
import { BUSINESS } from "@/lib/business";
import { cn } from "@/lib/utils";
import { ContactForm } from "@/features/contact/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call, email, or visit BMR Pharmacy in Morong, Rizal — open 24 hours, every day.",
};

interface ContactPageProps {
  searchParams: Promise<{ subject?: string | string[] }>;
}

const CONTACT_METHODS = [
  {
    icon: Phone,
    label: "Call us",
    value: BUSINESS.phone.display,
    detail: "Fastest for urgent questions",
    href: BUSINESS.phone.href,
  },
  {
    icon: Mail,
    label: "Email us",
    value: BUSINESS.email.display,
    detail: "For non-urgent questions",
    href: BUSINESS.email.href,
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: `${BUSINESS.address.street}, ${BUSINESS.address.city}`,
    detail: BUSINESS.address.landmark,
    href: BUSINESS.mapsHref,
    external: true,
  },
  {
    icon: Clock,
    label: "Hours",
    value: BUSINESS.hours.long,
    detail: "Walk in any time — no appointment needed",
  },
];

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { subject } = await searchParams;
  const defaultSubject = typeof subject === "string" ? subject.slice(0, 150) : "";

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="We're here, day and night"
        description="Questions about a prescription, a product, or anything else — our team is ready to help 24 hours a day."
      />

      <Section className="pt-10 sm:pt-12">
        <Container className="grid gap-8 lg:grid-cols-[22rem_1fr] lg:gap-10">
          <div className="space-y-4">
            <Stagger as="ul" className="space-y-3">
              {CONTACT_METHODS.map((method) => {
                const content = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
                      <method.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-neutral-500">
                        {method.label}
                        {method.external && <ArrowUpRight className="size-3.5" aria-hidden="true" />}
                      </span>
                      <span className="mt-1 block font-semibold text-neutral-900">{method.value}</span>
                      <span className="mt-0.5 block text-sm text-neutral-600">{method.detail}</span>
                    </span>
                  </>
                );
                const base = "flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4";
                return (
                  <StaggerItem as="li" key={method.label}>
                    {method.href ? (
                      <a
                        href={method.href}
                        {...(method.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={cn(
                          base,
                          "focus-ring group transition-[border-color,box-shadow,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-soft motion-reduce:hover:translate-y-0",
                        )}
                      >
                        {content}
                        {method.external && <span className="sr-only">(opens Google Maps in a new tab)</span>}
                      </a>
                    ) : (
                      <div className={base}>{content}</div>
                    )}
                  </StaggerItem>
                );
              })}
            </Stagger>

            <div className="flex gap-3 rounded-2xl border border-accent-200 bg-accent-50 p-4 text-sm text-accent-900">
              <Siren className="mt-0.5 size-5 shrink-0 text-accent-600" aria-hidden="true" />
              <p>
                <strong className="font-semibold">Medical emergency?</strong> Call{" "}
                <a href="tel:911" className="focus-ring rounded font-bold underline underline-offset-2">
                  911
                </a>{" "}
                or go to the nearest hospital right away.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-soft sm:p-10">
            <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-900">Send us a message</h2>
            <p className="mt-1 text-neutral-600">We&apos;ll get back to you as soon as possible.</p>
            <div className="mt-8">
              <ContactForm defaultSubject={defaultSubject} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
