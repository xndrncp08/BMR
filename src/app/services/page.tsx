import Link from "next/link";
import { Section, Container, buttonVariants } from "@/components/ui";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SERVICES } from "@/features/services/data";

export default function ServicesPage() {
  return (
    <>
      <Section className="pb-12 pt-10 sm:pt-16">
        <Container>
          <SectionHeading
            eyebrow="Our Services"
            title="Everything you need from your pharmacy"
            description="From prescriptions to personal guidance, here's how we support your health day to day."
          />
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <div className="space-y-6">
            {SERVICES.map((service, index) => (
              <div
                key={service.slug}
                className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                  <service.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-xs text-neutral-500">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-1 font-display text-xl font-bold text-neutral-900">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-neutral-500">{service.description}</p>
                </div>
                <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
                  Ask About This
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
