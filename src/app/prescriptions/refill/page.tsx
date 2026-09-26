import type { Metadata } from "next";
import { BadgeCheck, BellRing, ClipboardList, Phone } from "lucide-react";
import { Container, Section, buttonVariants } from "@/components/ui";
import { PageHeader } from "@/components/shared/PageHeader";
import { BUSINESS } from "@/lib/business";
import { PrescriptionRefillForm } from "@/features/prescriptions/components/PrescriptionRefillForm";

export const metadata: Metadata = {
  title: "Refill Prescription",
  description: "Request a prescription refill online from BMR Pharmacy — we'll let you know when it's ready.",
};

const STEPS = [
  { icon: ClipboardList, title: "Send your request", description: "A short online form." },
  { icon: BadgeCheck, title: "We prepare it", description: "Checked by a licensed pharmacist." },
  { icon: BellRing, title: "We notify you", description: "By text or email when it's ready." },
];

export default function PrescriptionRefillPage() {
  return (
    <>
      <PageHeader
        eyebrow="Prescriptions"
        title="Request a refill"
        description="Tell us what you need and we'll have it ready for you — no waiting in line."
      />
      <Section className="pt-10 sm:pt-12">
        <Container className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-10">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-soft sm:p-10">
            <PrescriptionRefillForm />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6">
              <h2 className="font-display text-lg font-bold tracking-tight text-neutral-900">How it works</h2>
              <ol className="mt-5 space-y-5">
                {STEPS.map((step, index) => (
                  <li key={step.title} className="relative flex gap-4">
                    {index < STEPS.length - 1 && (
                      <span
                        className="absolute left-5 top-11 h-[calc(100%-1.25rem)] w-px bg-neutral-200"
                        aria-hidden="true"
                      />
                    )}
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600">
                      <step.icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-neutral-900">{step.title}</p>
                      <p className="text-sm text-neutral-600">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-primary-950 p-6 text-white">
              <div className="bg-dot-grid-inverse absolute inset-0" aria-hidden="true" />
              <div className="relative">
                <h2 className="font-display text-lg font-bold">Need it urgently?</h2>
                <p className="mt-1 text-sm text-primary-100/80">
                  Call us directly — we&apos;re open 24 hours, every day.
                </p>
                <a
                  href={BUSINESS.phone.href}
                  className={`${buttonVariants({ variant: "inverse" })} mt-5 w-full`}
                >
                  <Phone aria-hidden="true" />
                  {BUSINESS.phone.display}
                </a>
              </div>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
