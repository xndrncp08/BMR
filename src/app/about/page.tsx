import type { Metadata } from "next";
import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  Award,
  CheckCircle2,
  Compass,
  HeartHandshake,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { Container, Section, buttonVariants } from "@/components/ui";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: "About",
  description:
    "BMR Pharmacy is a locally owned, family-operated community pharmacy in Morong, Rizal, founded in 2019 by licensed pharmacist Bethel Ann Tiratira.",
};

const VALUES = [
  { icon: HeartHandshake, title: "Compassion", description: "We care for every patient with empathy and respect." },
  { icon: ShieldCheck, title: "Integrity", description: "We uphold honesty, professionalism, and ethical pharmacy practice." },
  { icon: Award, title: "Excellence", description: "We strive for the highest standards in healthcare service." },
  { icon: Accessibility, title: "Accessibility", description: "We make quality medications and healthcare available to everyone." },
  { icon: Users, title: "Community", description: "We are committed to improving the health of the communities we serve." },
];

const WHY_CHOOSE_US = [
  "Licensed and professional pharmaceutical care",
  "Open 24 hours for your convenience",
  "Wide selection of trusted medications and healthcare products",
  "Friendly, knowledgeable, and approachable staff",
  "Personalized customer service",
  "Convenient location in the heart of Morong, Rizal",
  "Commitment to affordable and accessible healthcare for the community",
];

const AT_A_GLANCE = [
  { label: "Established", value: String(BUSINESS.founded) },
  { label: "Founder", value: BUSINESS.founder },
  { label: "Business type", value: "Community pharmacy" },
  { label: "Operating hours", value: BUSINESS.hours.long },
  { label: "Address", value: `${BUSINESS.address.street}, ${BUSINESS.address.city}` },
  { label: "Landmark", value: BUSINESS.address.landmark },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About BMR Pharmacy"
        title="Healthcare that knows your name"
        description="A locally owned, family-operated pharmacy serving generations of Morong families with trust, integrity, and professional care."
      />

      {/* Story */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="Our story" title="From a neighborhood counter to a trusted partner" />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-neutral-700">
              <p>
                Established in {BUSINESS.founded} by licensed pharmacist Bethel Ann Tiratira, BMR
                Pharmacy was founded with a simple mission: to make quality healthcare and trusted
                medications accessible to every member of the Morong community.
              </p>
              <p>
                What began as a neighborhood pharmacy has grown into a dependable healthcare
                partner. We believe every patient deserves personalized attention, accurate
                medication guidance, and exceptional customer service — so our team works closely
                with each customer to make sure they get the right medicine and the right advice.
              </p>
              <p>
                As a family-operated pharmacy, we&apos;re proud to build lasting relationships
                based on trust, integrity, and professional care.
              </p>
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal direction="left">
              <div className="relative overflow-hidden rounded-3xl bg-primary-950 p-7 text-white">
                <div className="bg-dot-grid-inverse absolute inset-0" aria-hidden="true" />
                <div className="relative flex items-center gap-4">
                  <span
                    className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 font-display text-xl font-bold"
                    aria-hidden="true"
                  >
                    BT
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold">{BUSINESS.founder}</p>
                    <p className="text-sm text-primary-100/75">Founder & licensed pharmacist</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal direction="left" delay={0.1}>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-200">
                {[
                  { value: <>{BUSINESS.founded}</>, label: "Established" },
                  { value: <AnimatedCounter value={24} suffix="/7" />, label: "Always open" },
                  { value: <>100%</>, label: "Licensed & professional" },
                  { value: <>1</>, label: "Trusted community location" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse gap-1 bg-white p-6">
                    <dt className="text-sm text-neutral-600">{stat.label}</dt>
                    <dd className="font-display text-3xl font-extrabold tracking-tight text-primary-700">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section tone="tint">
        <Container>
          <Stagger className="grid gap-5 md:grid-cols-2">
            <StaggerItem className="h-full">
              <div className="h-full rounded-3xl bg-white p-8 shadow-soft ring-1 ring-primary-100 sm:p-10">
                <span className="grid size-12 place-items-center rounded-2xl bg-primary-600 text-white">
                  <Target className="size-6" aria-hidden="true" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-neutral-900">
                  Our mission
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-neutral-700">
                  To improve the health and well-being of our community by providing safe,
                  affordable, and high-quality pharmaceutical products and healthcare services while
                  delivering compassionate, patient-centered care.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem className="h-full">
              <div className="h-full rounded-3xl bg-white p-8 shadow-soft ring-1 ring-primary-100 sm:p-10">
                <span className="grid size-12 place-items-center rounded-2xl bg-accent-600 text-white">
                  <Compass className="size-6" aria-hidden="true" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-neutral-900">
                  Our vision
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-neutral-700">
                  To become one of the most trusted community pharmacies in Rizal by continuously
                  providing accessible healthcare solutions, exceptional customer service, and
                  innovative pharmacy services that positively impact the lives of our patients.
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </Container>
      </Section>

      {/* Values */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Our commitment" title="The values behind every prescription" align="center" />
          </Reveal>
          <Stagger as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((value) => (
              <StaggerItem
                as="li"
                key={value.title}
                className="rounded-3xl border border-neutral-200 bg-white p-6 text-center shadow-xs"
              >
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary-600 ring-1 ring-inset ring-primary-100">
                  <value.icon className="size-7" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-neutral-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{value.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Why us + at a glance */}
      <Section tone="white" className="border-t border-neutral-200">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading eyebrow="Why choose us" title="Why families trust BMR Pharmacy" />
            </Reveal>
            <Stagger as="ul" className="mt-8 space-y-3">
              {WHY_CHOOSE_US.map((reason) => (
                <StaggerItem as="li" key={reason} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary-600" aria-hidden="true" />
                  <span className="text-neutral-800">{reason}</span>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2}>
              <Link href="/contact" className={`${buttonVariants({ variant: "primary" })} mt-10`}>
                Get in touch
                <ArrowRight aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <Reveal direction="left">
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-7 sm:p-8">
              <h2 className="font-display text-xl font-bold tracking-tight text-neutral-900">
                Pharmacy at a glance
              </h2>
              <dl className="mt-6 divide-y divide-neutral-200">
                {AT_A_GLANCE.map((item) => (
                  <div key={item.label} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
                    <dt className="text-sm font-semibold text-neutral-500">{item.label}</dt>
                    <dd className="text-neutral-800">{item.value}</dd>
                  </div>
                ))}
                <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="text-sm font-semibold text-neutral-500">Phone</dt>
                  <dd>
                    <a
                      href={BUSINESS.phone.href}
                      className="focus-ring rounded font-semibold text-primary-700 hover:text-primary-800"
                    >
                      {BUSINESS.phone.display}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
