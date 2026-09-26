import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, Phone, Stethoscope } from "lucide-react";
import { Container, Section, buttonVariants } from "@/components/ui";
import { Accordion } from "@/components/ui/Accordion";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { BUSINESS } from "@/lib/business";
import { SERVICES, SERVICE_FAQS } from "@/features/services/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Prescription dispensing, OTC medicines, vitamins, medication counseling, and pharmacist consultations at BMR Pharmacy in Morong, Rizal.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title="Everything you need from your pharmacy"
        description="From prescriptions to personal guidance, here's how our licensed team supports your health — any hour of the day."
      >
        <nav aria-label="Jump to a service">
          <ul className="flex flex-wrap gap-2">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <a
                  href={`#${service.slug}`}
                  className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3.5 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800"
                >
                  <service.icon className="size-3.5 text-primary-600" aria-hidden="true" />
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <Section>
        <Container>
          <Stagger as="ul" className="grid gap-5 md:grid-cols-2">
            {SERVICES.map((service, index) => (
              <StaggerItem as="li" key={service.slug}>
                <article
                  id={service.slug}
                  className="group flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-7 shadow-xs transition-[border-color,box-shadow] duration-300 target:border-primary-400 target:shadow-glow sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary-600 ring-1 ring-inset ring-primary-100">
                      <service.icon className="size-7" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-sm text-neutral-400" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-6 font-display text-xl font-bold tracking-tight text-neutral-900">
                    {service.title}
                  </h2>
                  <p className="mt-1 font-medium text-primary-700">{service.shortDescription}</p>
                  <p className="mt-3 leading-relaxed text-neutral-600">{service.description}</p>
                  <Link
                    href={`/contact?subject=${encodeURIComponent(service.title)}`}
                    className="focus-ring mt-auto inline-flex w-fit items-center gap-1.5 rounded pt-6 text-sm font-semibold text-primary-700 hover:text-primary-800"
                  >
                    Ask about this service
                    <ArrowRight
                      className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Consultation callout */}
      <Section spacing="none">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-4xl bg-primary-950 px-8 py-12 text-white sm:px-12 sm:py-16">
              <div className="bg-dot-grid-inverse absolute inset-0" aria-hidden="true" />
              <div
                className="absolute -right-24 -top-24 size-80 rounded-full bg-primary-600/40 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="flex gap-5">
                  <span className="hidden size-14 shrink-0 place-items-center rounded-2xl bg-white/10 ring-1 ring-inset ring-white/20 sm:grid">
                    <Stethoscope className="size-7 text-primary-200" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-display text-display-md font-bold">
                      Questions about your medicine?
                    </h2>
                    <p className="mt-3 max-w-xl text-lg text-primary-100/80">
                      Talk to a licensed pharmacist today — in person, by phone, or online. No
                      appointment, no pressure.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a href={BUSINESS.phone.href} className={buttonVariants({ variant: "inverse", size: "lg" })}>
                    <Phone aria-hidden="true" />
                    Call {BUSINESS.phone.display}
                  </a>
                  <Link href="/contact" className={buttonVariants({ variant: "inverse-outline", size: "lg" })}>
                    <MessageCircle aria-hidden="true" />
                    Send a message
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title="Good questions, honest answers"
              description="Can't find what you're looking for? Our team is happy to help at any hour."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion items={SERVICE_FAQS} />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
