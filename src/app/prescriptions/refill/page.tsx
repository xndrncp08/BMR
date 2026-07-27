import type { Metadata } from "next";
import { Section, Container } from "@/components/ui";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PrescriptionRefillForm } from "@/features/prescriptions/components/PrescriptionRefillForm";

export const metadata: Metadata = {
  title: "Refill Prescription — BMR Pharmacy",
};

export default function PrescriptionRefillPage() {
  return (
    <Section className="pb-16 pt-10 sm:pt-16">
      <Container>
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="Prescriptions"
            title="Request a Refill"
            description="Fill out the form below and we'll have it ready for pickup or delivery."
          />
          <div className="mt-10">
            <PrescriptionRefillForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}