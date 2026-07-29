import Link from "next/link";
import { cn } from "@/lib/utils";
import { Section, Container, buttonVariants } from "@/components/ui";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SERVICES } from "@/features/services/data";

export default function ServicesPage() {
  return (
    <>
      <Section tone="vividAlt" className="pb-12 pt-10 sm:pt-16">
        <Container>
          <SectionHeading
            eyebrow="Our Services"
            title="Everything you need from your pharmacy"
            description="From prescriptions to personal guidance, here's how we support your health day to day."
          />
        </Container>
      </Section>

      <Section tone="default">
        <Container>
          <div className="space-y-6">
            {SERVICES.map((service, index) => {
              const isPrimary = index % 2 === 0;
              return (
                <div
                  key={service.slug}
                  className={cn(
                    "flex flex-col gap-6 rounded-2xl border-l-4 bg-white p-8 shadow-sm sm:flex-row sm:items-center",
                    isPrimary ? "border-l-primary" : "border-l-secondary",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-16 w-16 shrink-0 items-center justify-center rounded-xl",
                      isPrimary ? "bg-primary-light" : "bg-secondary-light",
                    )}
                  >
                    <service.icon
                      className={cn(
                        "h-8 w-8",
                        isPrimary ? "text-primary" : "text-secondary-dark",
                      )}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-xs text-neutral-500">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1 font-display text-xl font-bold text-neutral-900">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-neutral-500">
                      {service.description}
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Ask About This
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
