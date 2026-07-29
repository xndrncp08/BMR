import Link from "next/link";
import { Pill, MapPin, Phone, Mail, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Section,
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  buttonVariants,
} from "@/components/ui";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { FloatingIcon } from "@/components/shared/FloatingIcon";
import { ProductCard } from "@/features/products/components/ProductCard";
import { FEATURED_PRODUCTS } from "@/features/products/data/featured-products";
import { SERVICES } from "@/features/services/data";

const STATS = [
  { value: 2019, suffix: "", label: "Established", tone: "primary" as const },
  { value: 24, suffix: "/7", label: "Always Open", tone: "secondary" as const },
  {
    value: 100,
    suffix: "%",
    label: "Licensed & Professional",
    tone: "secondary" as const,
  },
  {
    value: 1,
    suffix: "",
    label: "Trusted Community Location",
    tone: "primary" as const,
  },
];

const SERVICE_ACCENTS = ["primary", "secondary", "primary"] as const;

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Section tone="dark" className="pb-20 pt-14 sm:pt-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-light ring-1 ring-white/20">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" /> Open 24
                  Hours
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
                  Your health,{" "}
                  <span className="text-primary-light">handled with care</span>.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-md text-lg text-white/80">
                  A locally owned, family-operated pharmacy in Morong, Rizal —
                  serving the community with trusted medications and genuine,
                  round-the-clock care since 2019.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/prescriptions/refill"
                    className={buttonVariants({
                      variant: "primary",
                      size: "lg",
                    })}
                  >
                    Refill Prescription
                  </Link>
                  <Link
                    href="/services"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "border-white/30 bg-white/10 text-white hover:bg-white/20",
                    )}
                  >
                    Explore Services
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal direction="left" delay={0.1}>
              <div className="flex aspect-square items-center justify-center rounded-3xl border border-white/15 bg-white/5 shadow-xl backdrop-blur-sm">
                <FloatingIcon>
                  <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg">
                    <Pill
                      className="h-20 w-20 text-white"
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                  </div>
                </FloatingIcon>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* About Preview */}
      <Section tone="default">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal direction="right">
              <div>
                <SectionHeading
                  eyebrow="About Us"
                  title="Care that goes beyond the counter"
                  description="Since 2019, BMR Pharmacy has combined clinical expertise with genuine, unhurried attention — because good healthcare starts with being heard."
                />
                <Link
                  href="/about"
                  className="mt-6 inline-block font-semibold text-primary hover:text-primary-dark"
                >
                  Learn our story →
                </Link>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.08} hover>
                  <div
                    className={cn(
                      "rounded-xl p-6 shadow-sm",
                      stat.tone === "primary"
                        ? "bg-primary-light"
                        : "bg-secondary-light",
                    )}
                  >
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      className={cn(
                        "font-display text-3xl font-bold",
                        stat.tone === "primary"
                          ? "text-primary"
                          : "text-secondary-dark",
                      )}
                    />
                    <p className="mt-1 text-sm text-neutral-700">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Preview */}
      <Section tone="vividAlt">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What We Offer"
              title="Services built around you"
              description="From prescription dispensing to pharmacist consultation, our team is here for the everyday and the unexpected."
              align="center"
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 3).map((service, index) => {
              const accent = SERVICE_ACCENTS[index];
              const isPrimary = accent === "primary";
              return (
                <Reveal key={service.slug} delay={index * 0.1} hover>
                  <Card
                    className={cn(
                      "border-t-4 bg-white",
                      isPrimary ? "border-t-primary" : "border-t-secondary",
                    )}
                  >
                    <CardHeader>
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-full",
                          isPrimary ? "bg-primary-light" : "bg-secondary-light",
                        )}
                      >
                        <service.icon
                          className={cn(
                            "h-6 w-6",
                            isPrimary ? "text-primary" : "text-secondary-dark",
                          )}
                          aria-hidden="true"
                        />
                      </div>
                      <CardTitle className="mt-3">{service.title}</CardTitle>
                      <CardDescription>
                        {service.shortDescription}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-8 text-center">
              <Link
                href="/services"
                className={buttonVariants({ variant: "primary" })}
              >
                View All Services
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Product Preview */}
      <Section tone="default">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Featured Products"
              title="Wellness essentials, in stock"
              align="center"
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PRODUCTS.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.08} hover>
                <ProductCard
                  product={product}
                  accent={index % 2 === 0 ? "primary" : "secondary"}
                />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-8 text-center">
              <Link
                href="/products"
                className={buttonVariants({ variant: "outline" })}
              >
                Shop All Products
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Contact Preview */}
      <Section tone="dark">
        <Container>
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-gradient-to-br from-primary to-secondary-dark px-8 py-12 text-center text-white sm:flex-row sm:text-left">
              <div>
                <h2 className="font-display text-2xl font-bold">
                  Have a question?
                </h2>
                <p className="mt-2 max-w-md text-white/90">
                  Open 24 hours — reach out however&apos;s easiest for you.
                </p>
                <div className="mt-4 flex flex-col gap-2 text-sm text-white/90 sm:flex-row sm:gap-6">
                  <span className="flex items-center justify-center gap-2 sm:justify-start">
                    <Phone className="h-4 w-4" aria-hidden="true" /> +63 975 373
                    7338
                  </span>
                  <span className="flex items-center justify-center gap-2 sm:justify-start">
                    <Mail className="h-4 w-4" aria-hidden="true" />{" "}
                    info@bmrpharmacy.com
                  </span>
                  <span className="flex items-center justify-center gap-2 sm:justify-start">
                    <MapPin className="h-4 w-4" aria-hidden="true" /> Morong,
                    Rizal
                  </span>
                </div>
              </div>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-white text-primary hover:bg-white/90",
                )}
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
