import { Pill, Stethoscope, HeartPulse, ShoppingBag, Users, type LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    slug: "prescription-management",
    icon: Pill,
    title: "Prescription Management",
    shortDescription: "Fast refills, transfers, and reminders.",
    description:
      "We handle new prescriptions, refills, and transfers from other pharmacies, and can set up automatic refill reminders so you never run out of an important medication.",
  },
  {
    slug: "medication-consultation",
    icon: Stethoscope,
    title: "Medication Consultation",
    shortDescription: "One-on-one time with a pharmacist.",
    description:
      "Sit down with a licensed pharmacist to review your medications, ask questions about dosage or side effects, and check for interactions across everything you take.",
  },
  {
    slug: "health-advice",
    icon: HeartPulse,
    title: "Health Advice",
    shortDescription: "Guidance for everyday health decisions.",
    description:
      "From choosing an over-the-counter remedy to understanding a new diagnosis, our pharmacists are available for informal, no-appointment-needed guidance.",
  },
  {
    slug: "wellness-products",
    icon: ShoppingBag,
    title: "Wellness Products",
    shortDescription: "Vitamins, supplements, and essentials.",
    description:
      "A curated selection of vitamins, supplements, and everyday health essentials, chosen for quality and vetted by our pharmacy team.",
  },
  {
    slug: "patient-support",
    icon: Users,
    title: "Patient Support",
    shortDescription: "Help navigating insurance and care.",
    description:
      "We help patients navigate insurance coverage, prior authorizations, and coordination with their doctors, so getting the right medication is one less thing to worry about.",
  },
];
