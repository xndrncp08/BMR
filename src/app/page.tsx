import Link from "next/link";
import { Pill, MapPin, Phone, Mail } from "lucide-react";
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
import { ProductCard } from "@/features/products/components/ProductCard";
import { FEATURED_PRODUCTS } from "@/features/products/data/featured-products";
import { SERVICES } from "@/features/services/data";

// Placeholder — replace with real figures before launch.
const STATS = [
  {
    label: "Years Serving the Community",
    value: "15+",
    tone: "primary" as const,
  },
  {
    label: "Prescriptions Filled Yearly",
    value: "50,000+",
    tone: "secondary" as const,
  },
  { label: "Licensed Pharmacists", value: "6", tone: "secondary" as const },
  { label: "Average Wait Time", value: "<10 min", tone: "primary" as const },
];

const SERVICE_ACCENTS = ["primary", "secondary", "primary"] as const;

export default function Home() {
  return (
    <>
      {/* Hero — colorful mesh background instead of flat white */}
      <Section tone="vivid" className="pb-20 pt-14 sm:pt-20">
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
              <p className="mt-4 max-w-md text-lg text-neutral-700">
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
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-neutral-900/20 bg-white/60 backdrop-blur-sm hover:bg-white",
                  )}
                >
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="flex aspect-square items-center justify-center rounded-3xl border border-white/60 bg-white/70 shadow-xl backdrop-blur-sm">
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg">
                <Pill
                  className="h-20 w-20 text-white"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* About Preview */}
      <Section tone="default">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="About Us"
                title="Care that goes beyond the counter"
                description="For over a decade, BMR Pharmacy has combined clinical expertise with genuine, unhurried attention — because good healthcare starts with being heard."
              />
              <Link
                href="/about"
                className="mt-6 inline-block font-semibold text-primary hover:text-primary-dark"
              >
                Learn our story →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className={cn(
                    "rounded-xl p-6 shadow-sm",
                    stat.tone === "primary"
                      ? "bg-primary-light"
                      : "bg-secondary-light",
                  )}
                >
                  <p
                    className={cn(
                      "font-display text-3xl font-bold",
                      stat.tone === "primary"
                        ? "text-primary"
                        : "text-secondary-dark",
                    )}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-neutral-700">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Preview */}
      <Section tone="vividAlt">
        <Container>
          <SectionHeading
            eyebrow="What We Offer"
            title="Services built around you"
            description="From same-day refills to one-on-one consultations, our team is here for the everyday and the unexpected."
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 3).map((service, index) => {
              const accent = SERVICE_ACCENTS[index];
              const isPrimary = accent === "primary";
              return (
                <Card
                  key={service.slug}
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
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/services"
              className={buttonVariants({ variant: "primary" })}
            >
              View All Services
            </Link>
          </div>
        </Container>
      </Section>

      {/* Product Preview */}
      <Section tone="default">
        <Container>
          <SectionHeading
            eyebrow="Featured Products"
            title="Wellness essentials, in stock"
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PRODUCTS.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                accent={index % 2 === 0 ? "primary" : "secondary"}
              />
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
      <Section tone="dark">
        <Container>
          <div className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-gradient-to-br from-primary to-secondary-dark px-8 py-12 text-center text-white sm:flex-row sm:text-left">
            <div>
              <h2 className="font-display text-2xl font-bold">
                Have a question?
              </h2>
              <p className="mt-2 max-w-md text-white/90">
                Our team is ready to help — reach out however's easiest for you.
              </p>
              <div className="mt-4 flex flex-col gap-2 text-sm text-white/90 sm:flex-row sm:gap-6">
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
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-white text-primary hover:bg-white/90",
              )}
            >
              Contact Us
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
