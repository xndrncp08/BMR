import {
  Pill,
  ShoppingBag,
  Sparkles,
  Droplets,
  Syringe,
  MessageCircle,
  Stethoscope,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    slug: "prescription-dispensing",
    icon: Pill,
    title: "Prescription Medication Dispensing",
    shortDescription: "Accurate, reliable prescription fulfillment.",
    description:
      "We fill new prescriptions and refills with careful attention to accuracy, safety, and proper labeling — the foundation of everything else we do.",
  },
  {
    slug: "otc-medicines",
    icon: ShoppingBag,
    title: "Over-the-Counter Medicines",
    shortDescription: "Everyday remedies, always in stock.",
    description:
      "A wide selection of trusted over-the-counter medications for everyday health needs, from pain relief to colds and allergies.",
  },
  {
    slug: "vitamins-supplements",
    icon: Sparkles,
    title: "Vitamins & Nutritional Supplements",
    shortDescription: "Support for everyday wellness.",
    description:
      "Vitamins and nutritional supplements chosen for quality, to help support your family's everyday health and wellness routine.",
  },
  {
    slug: "personal-care",
    icon: Droplets,
    title: "Personal Care & Hygiene Products",
    shortDescription: "Everyday essentials for the whole family.",
    description:
      "Personal care and hygiene essentials for every member of the household, all in one convenient stop.",
  },
  {
    slug: "medical-supplies",
    icon: Syringe,
    title: "Basic Medical Supplies",
    shortDescription: "First aid and home care essentials.",
    description:
      "Basic medical supplies for home care and first aid, so you're prepared for the everyday and the unexpected.",
  },
  {
    slug: "medication-counseling",
    icon: MessageCircle,
    title: "Medication Counseling",
    shortDescription: "Clear guidance on how to take your medicine.",
    description:
      "One-on-one counseling on proper medication use, dosage, and precautions — because understanding your medicine matters as much as taking it.",
  },
  {
    slug: "pharmacist-consultation",
    icon: Stethoscope,
    title: "Pharmacist Consultation",
    shortDescription: "Direct access to licensed expertise.",
    description:
      "Speak directly with our licensed pharmacist about your medications, potential interactions, or general health concerns — no appointment needed.",
  },
  {
    slug: "health-wellness-guidance",
    icon: HeartPulse,
    title: "Health & Wellness Guidance",
    shortDescription: "Everyday advice for a healthier life.",
    description:
      "Friendly, informed guidance on everyday health decisions, from choosing the right supplement to simple lifestyle advice.",
  },
];
