import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BellRing,
  CalendarHeart,
  CheckCircle2,
  ClipboardList,
  Clock,
  HeartHandshake,
  MapPin,
  Phone,
  Pill,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BUSINESS } from "@/lib/business";
import { Badge, Container, Section, StatusDot, buttonVariants } from "@/components/ui";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { HeroVisual } from "@/features/home/components/HeroVisual";
import { ProductCard } from "@/features/products/components/ProductCard";
import { FEATURED_PRODUCTS } from "@/features/products/data/featured-products";
import { SERVICES } from "@/features/services/data";

const TRUST_POINTS = ["Licensed pharmacists", `Serving Morong since ${BUSINESS.founded}`, "Family-owned"];

const REFILL_STEPS = [
  {
    icon: ClipboardList,
    title: "Send your request",
    description: "Fill out a short online form with your medicine and contact details.",
  },
  {
    icon: BadgeCheck,
    title: "We prepare it",
    description: "Our licensed pharmacist checks and prepares your prescription with care.",
  },
  {
    icon: BellRing,
    title: "We let you know",
    description: "You'll get a text or email when it's ready — pick it up any time, day or night.",
  },
];

const REASONS = [
  "Licensed and professional pharmaceutical care",
  "Friendly, knowledgeable, and approachable staff",
  "Wide selection of trusted medications",
  "Personalized, unhurried customer service",
  "Affordable, accessible healthcare for the community",
];

// Bento layout: the first service is featured, the rest fill the grid
const FEATURED_SERVICE = SERVICES[0];
const BENTO_SERVICES = [SERVICES[6], SERVICES[1], SERVICES[5]];

export default function Home() {
  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative isolate overflow-hidden bg-primary-950 text-white">
        <div className="bg-dot-grid-inverse mask-radial absolute inset-0 -z-10" aria-hidden="true" />
        <div
          className="absolute -left-40 -top-40 -z-10 size-[36rem] rounded-full bg-primary-600/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-48 right-0 -z-10 size-[30rem] rounded-full bg-accent-600/15 blur-3xl"
          aria-hidden="true"
        />

        <Container className="grid items-center gap-16 pb-28 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pb-36 lg:pt-24">
          <div>
            <div className="animate-rise">
              <Badge tone="inverse" size="md">
                <StatusDot />
                Open now · 24 hours, 7 days a week
              </Badge>
            </div>
            <h1 className="animate-rise delay-1 mt-6 font-display text-display-xl font-extrabold">
              Care you can count on,{" "}
              <span className="bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200 bg-clip-text text-transparent">
                day or night.
              </span>
            </h1>
            <p className="animate-rise delay-2 mt-6 max-w-xl text-lg leading-relaxed text-primary-100/80 sm:text-xl">
              A locally owned, family-operated pharmacy in Morong, Rizal — trusted medications,
              honest advice from licensed pharmacists, and doors that never close.
            </p>
            <div className="animate-rise delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/prescriptions/refill" className={buttonVariants({ variant: "accent", size: "lg" })}>
                <Pill aria-hidden="true" />
                Refill a prescription
              </Link>
              <Link href="/services" className={buttonVariants({ variant: "inverse-outline", size: "lg" })}>
                Explore services
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <ul className="animate-rise delay-4 mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-primary-100/80">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary-300" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <HeroVisual />
        </Container>
      </section>

      {/* ─────────────────── Stats (overlaps hero) ─────────────────── */}
      <div className="relative z-10 -mt-14 lg:-mt-16">
        <Container>
          <Reveal>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-200 shadow-lift lg:grid-cols-4">
              <Stat label="Hours a day, every day">
                <AnimatedCounter value={24} suffix="/7" />
              </Stat>
              <Stat label="Pharmacy services">
                <AnimatedCounter value={SERVICES.length} />
              </Stat>
              <Stat label="Year we opened our doors">{BUSINESS.founded}</Stat>
              <Stat label="Pharmacist-led care">100%</Stat>
            </dl>
          </Reveal>
        </Container>
      </div>

      {/* ───────────────────────── Services bento ───────────────────────── */}
      <Section>
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="What we offer"
                title="Everything you need from your neighborhood pharmacy"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/services" className={buttonVariants({ variant: "outline" })}>
                All services
                <ArrowRight aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <StaggerItem className="md:col-span-2">
              <Link
                href="/prescriptions/refill"
                className="focus-ring group relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 to-primary-900 p-8 text-white shadow-soft transition-[box-shadow,transform] duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-glow motion-reduce:hover:translate-y-0 sm:p-10"
              >
                <div className="bg-dot-grid-inverse absolute inset-0" aria-hidden="true" />
                <FEATURED_SERVICE.icon
                  className="absolute -bottom-10 -right-6 size-64 rotate-12 text-white/[0.07] transition-transform duration-700 ease-out-expo group-hover:rotate-0 group-hover:scale-105"
                  strokeWidth={1}
                  aria-hidden="true"
                />
                <div className="relative">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-inset ring-white/20">
                    <FEATURED_SERVICE.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 max-w-md font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    {FEATURED_SERVICE.title}
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-primary-100/85">
                    {FEATURED_SERVICE.description}
                  </p>
                </div>
                <span className="relative mt-8 inline-flex items-center gap-2 font-semibold">
                  Request a refill online
                  <ArrowRight
                    className="size-5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </StaggerItem>

            {BENTO_SERVICES.map((service) => (
              <StaggerItem key={service.slug}>
                <ServiceTile service={service} />
              </StaggerItem>
            ))}
            <StaggerItem>
              <Link
                href="/services"
                className="focus-ring group flex h-full min-h-56 flex-col items-start justify-between rounded-3xl border border-dashed border-primary-300 bg-primary-50/60 p-7 transition-colors hover:border-primary-400 hover:bg-primary-50"
              >
                <p className="font-display text-xl font-bold tracking-tight text-primary-900">
                  +{SERVICES.length - 1 - BENTO_SERVICES.length} more services
                </p>
                <span className="inline-flex items-center gap-2 font-semibold text-primary-700">
                  See everything we do
                  <ArrowRight
                    className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </StaggerItem>
          </Stagger>
        </Container>
      </Section>

      {/* ───────────────────────── How refills work ───────────────────────── */}
      <Section tone="white" className="border-y border-neutral-200">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Refills made simple"
              title="Skip the wait in three easy steps"
              description="Request your refill from home — we'll have it ready before you arrive."
              align="center"
            />
          </Reveal>

          <div className="relative mt-14">
            {/* Connector line behind the step icons (desktop) */}
            <div
              className="absolute left-[16.66%] right-[16.66%] top-8 hidden border-t-2 border-dashed border-primary-200 md:block"
              aria-hidden="true"
            />
            <Stagger as="ol" className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {REFILL_STEPS.map((step, index) => (
              <StaggerItem as="li" key={step.title} className="relative text-center">
                <div className="relative mx-auto grid size-16 place-items-center rounded-2xl bg-white shadow-soft ring-1 ring-neutral-200">
                  <step.icon className="size-7 text-primary-600" aria-hidden="true" />
                  <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-accent-600 font-mono text-xs font-medium text-white ring-4 ring-white">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-neutral-900">
                  {step.title}
                </h3>
                <p className="mx-auto mt-2 max-w-xs leading-relaxed text-neutral-600">{step.description}</p>
              </StaggerItem>
            ))}
            </Stagger>
          </div>

          <Reveal delay={0.2} className="mt-12 flex justify-center">
            <Link href="/prescriptions/refill" className={buttonVariants({ variant: "primary", size: "lg" })}>
              Start a refill request
              <ArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
        </Container>
      </Section>

      {/* ───────────────────────── Featured products ───────────────────────── */}
      <Section>
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Featured products"
                title="Wellness essentials, always in stock"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/products" className={buttonVariants({ variant: "outline" })}>
                Browse all products
                <ArrowRight aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <Stagger as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PRODUCTS.map((product) => (
              <StaggerItem as="li" key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ───────────────────────── Our promise ───────────────────────── */}
      <Section tone="tint" className="overflow-hidden">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal direction="right">
            <figure className="relative rounded-4xl bg-primary-950 p-8 text-white shadow-lift sm:p-12">
              <div className="bg-dot-grid-inverse absolute inset-0 rounded-4xl" aria-hidden="true" />
              <HeartHandshake className="relative size-10 text-accent-400" aria-hidden="true" />
              <blockquote className="relative mt-6 font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                “Every patient deserves personalized attention, accurate medication guidance, and
                exceptional care.”
              </blockquote>
              <figcaption className="relative mt-8 flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-primary-600 font-display font-bold">
                  BMR
                </span>
                <span>
                  <span className="block font-semibold">Our promise to Morong</span>
                  <span className="block text-sm text-primary-100/75">
                    Founded in {BUSINESS.founded} by {BUSINESS.founder}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Why families choose us"
                title="Healthcare that knows your name"
                description="As a locally owned, family-operated pharmacy, we've built lasting relationships based on trust, integrity, and professional care."
              />
            </Reveal>
            <Stagger as="ul" className="mt-8 space-y-3">
              {REASONS.map((reason) => (
                <StaggerItem
                  as="li"
                  key={reason}
                  className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xs ring-1 ring-primary-100"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary-600 text-white">
                    <CheckCircle2 className="size-4" aria-hidden="true" />
                  </span>
                  <span className="font-medium text-neutral-800">{reason}</span>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2}>
              <Link href="/about" className={cn(buttonVariants({ variant: "link" }), "mt-8")}>
                Read our story
                <ArrowRight aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ───────────────────────── Visit us ───────────────────────── */}
      <Section>
        <Container>
          <Reveal>
            <div className="grid overflow-hidden rounded-4xl border border-neutral-200 bg-white shadow-soft lg:grid-cols-2">
              <div className="p-8 sm:p-12">
                <SectionHeading eyebrow="Visit us" title="Find us in the heart of Morong" />
                <dl className="mt-8 space-y-6">
                  <InfoRow icon={MapPin} label="Address">
                    {BUSINESS.address.street}, {BUSINESS.address.city}
                    <span className="mt-1 block text-sm text-neutral-500">{BUSINESS.address.landmark}</span>
                  </InfoRow>
                  <InfoRow icon={Clock} label="Hours">
                    {BUSINESS.hours.long}
                  </InfoRow>
                  <InfoRow icon={Phone} label="Phone">
                    <a href={BUSINESS.phone.href} className="focus-ring rounded hover:text-primary-700">
                      {BUSINESS.phone.display}
                    </a>
                  </InfoRow>
                </dl>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={BUSINESS.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "primary" })}
                  >
                    Get directions
                    <ArrowUpRight aria-hidden="true" />
                    <span className="sr-only">(opens Google Maps in a new tab)</span>
                  </a>
                  <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
                    Contact us
                  </Link>
                </div>
              </div>
              <MapIllustration />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col-reverse gap-1 bg-white p-6 sm:p-8">
      <dt className="text-sm text-neutral-600">{label}</dt>
      <dd className="font-display text-3xl font-extrabold tracking-tight text-primary-700 sm:text-4xl">
        {children}
      </dd>
    </div>
  );
}

function ServiceTile({ service }: { service: (typeof SERVICES)[number] }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="focus-ring group flex h-full min-h-56 flex-col rounded-3xl border border-neutral-200 bg-white p-7 shadow-xs transition-[box-shadow,transform,border-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-primary-200 hover:shadow-lift motion-reduce:hover:translate-y-0"
    >
      <span className="grid size-12 place-items-center rounded-2xl bg-primary-50 text-primary-600 ring-1 ring-inset ring-primary-100 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
        <service.icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-6 font-display text-lg font-bold tracking-tight text-neutral-900">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{service.shortDescription}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary-700">
        Learn more
        <ArrowRight
          className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <dt className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-500">{label}</dt>
        <dd className="mt-1 text-neutral-800">{children}</dd>
      </div>
    </div>
  );
}

/** Stylized, decorative street map with a location pin. */
function MapIllustration() {
  return (
    <div className="relative min-h-72 overflow-hidden bg-primary-50" aria-hidden="true">
      <svg className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 400">
        <defs>
          <pattern id="blocks" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="rgb(var(--primary-50))" />
            <rect x="8" y="8" width="64" height="64" rx="10" fill="rgb(var(--primary-100))" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#blocks)" />
        {/* River */}
        <path d="M-20 300 C 80 260, 160 360, 260 310 S 380 250, 440 280" stroke="rgb(var(--primary-200))" strokeWidth="34" fill="none" />
        {/* Roads */}
        <path d="M0 160 H400" stroke="white" strokeWidth="18" />
        <path d="M200 0 V400" stroke="white" strokeWidth="18" />
        <path d="M0 40 L400 260" stroke="white" strokeWidth="10" opacity="0.8" />
        {/* Bridge */}
        <rect x="188" y="290" width="24" height="44" rx="3" fill="rgb(var(--neutral-300))" />
      </svg>
      <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-full">
        <div className="relative flex flex-col items-center">
          <div className="animate-float flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lift">
            <span className="grid size-9 place-items-center rounded-xl bg-primary-600 text-white">
              <Store className="size-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-neutral-900">BMR Pharmacy</p>
              <p className="text-xs text-neutral-500">Near Namay Bridge</p>
            </div>
          </div>
          <span className="mt-2 size-4 rounded-full bg-accent-600 ring-4 ring-accent-600/25" />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-soft backdrop-blur">
        <CalendarHeart className="size-3.5 text-accent-600" />
        Open every day of the year
      </div>
    </div>
  );
}
