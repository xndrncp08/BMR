import Link from "next/link";
import { Pill, MapPin, Phone, Mail } from "lucide-react";
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
import { ProductCard } from "@/features/products/components/ProductCard";
import { FEATURED_PRODUCTS } from "@/features/products/data/featured-products";
import { SERVICES } from "@/features/services/data";

// Placeholder — replace with real figures before launch.
const STATS = [
  { label: "Years Serving the Community", value: "15+" },
  { label: "Prescriptions Filled Yearly", value: "50,000+" },
  { label: "Licensed Pharmacists", value: "6" },
  { label: "Average Wait Time", value: "<10 min" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Section className="pb-16 pt-10 sm:pt-16">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
                Your neighborhood pharmacy
              </p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl">
                Your health,{" "}
                <span className="text-primary">handled with care</span>.
              </h1>
              <p className="mt-4 max-w-md text-lg text-neutral-500">
                BMR Pharmacy pairs fast, reliable prescription service with real
                pharmacist guidance — because your medication questions deserve
                real answers.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/prescriptions/refill"
                  className={buttonVariants({ variant: "primary", size: "lg" })}
                >
                  Refill Prescription
                </Link>
                <Link
                  href="/services"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-primary-light to-secondary-light">
              <Pill
                className="h-32 w-32 text-primary"
                strokeWidth={1.25}
                aria-hidden="true"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* About Preview */}
      <Section tone="muted">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="About Us"
                title="Care that goes beyond the counter"
                description="For over a decade, BMR Pharmacy has combined clinical expertise with genuine, unhurried attention — because good healthcare starts with being heard."
              />
              <Link href="/about" className={cnGhostLink()}>
                Learn our story →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >
                  <p className="font-display text-3xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Preview */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What We Offer"
            title="Services built around you"
            description="From same-day refills to one-on-one consultations, our team is here for the everyday and the unexpected."
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 3).map((service) => (
              <Card key={service.slug}>
                <CardHeader>
                  <service.icon
                    className="h-8 w-8 text-primary"
                    aria-hidden="true"
                  />
                  <CardTitle className="mt-3">{service.title}</CardTitle>
                  <CardDescription>{service.shortDescription}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/services"
              className={buttonVariants({ variant: "outline" })}
            >
              View All Services
            </Link>
          </div>
        </Container>
      </Section>

      {/* Product Preview */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Featured Products"
            title="Wellness essentials, in stock"
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/products"
              className={buttonVariants({ variant: "outline" })}
            >
              Shop All Products
            </Link>
          </div>
        </Container>
      </Section>

      {/* Contact Preview */}
      <Section>
        <Container>
          <div className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-primary px-8 py-12 text-center text-white sm:flex-row sm:text-left">
            <div>
              <h2 className="font-display text-2xl font-bold">
                Have a question?
              </h2>
              <p className="mt-2 max-w-md text-primary-light">
                Our team is ready to help — reach out however's easiest for you.
              </p>
              <div className="mt-4 flex flex-col gap-2 text-sm text-primary-light sm:flex-row sm:gap-6">
                <span className="flex items-center justify-center gap-2 sm:justify-start">
                  <Phone className="h-4 w-4" aria-hidden="true" /> (000)
                  000-0000
                </span>
                <span className="flex items-center justify-center gap-2 sm:justify-start">
                  <Mail className="h-4 w-4" aria-hidden="true" />{" "}
                  info@bmrpharmacy.com
                </span>
                <span className="flex items-center justify-center gap-2 sm:justify-start">
                  <MapPin className="h-4 w-4" aria-hidden="true" /> 123 Main
                  Street
                </span>
              </div>
            </div>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Contact Us
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

// Small local helper so the "Learn our story" link matches the ghost
// button style without needing full button semantics (it's a text link).
function cnGhostLink() {
  return "mt-6 inline-block font-semibold text-primary hover:text-primary-dark";
}
