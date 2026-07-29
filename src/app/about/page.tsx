import { HeartHandshake, ShieldCheck, Award, Accessibility, Users, MapPin, Clock, Phone, Building2, Calendar, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Section, Container, Card, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Compassion",
    description: "We care for every patient with empathy and respect.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "We uphold honesty, professionalism, and ethical pharmacy practice.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for the highest standards in healthcare service.",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    description: "We make quality medications and healthcare available to everyone.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We are committed to improving the health of the communities we serve.",
  },
];

const PHARMACY_INFO = [
  { icon: Building2, label: "Business Name", value: "BMR Pharmacy" },
  { icon: Calendar, label: "Established", value: "2019" },
  { icon: Users, label: "Founder", value: "Bethel Ann Tiratira, RPh" },
  { icon: Building2, label: "Business Type", value: "Community Pharmacy" },
  {
    icon: MapPin,
    label: "Address",
    value: "81 T. Claudio Street, Barangay San Juan Poblacion, Morong, Rizal 1960, Philippines",
  },
  {
    icon: MapPin,
    label: "Landmark",
    value: "Near Namay Bridge, across from Let's Buy, ground floor below Beauty by Zcharina Aesthetic Clinic",
  },
  { icon: Clock, label: "Operating Hours", value: "Open 24 Hours (Monday–Sunday)" },
  { icon: Phone, label: "Phone Number", value: "+63 975 373 7338" },
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

const STATS = [
  { value: 2019, suffix: "", label: "Established", tone: "primary" as const },
  { value: 24, suffix: "/7", label: "Always Open", tone: "secondary" as const },
  { value: 100, suffix: "%", label: "Licensed & Professional", tone: "secondary" as const },
  { value: 1, suffix: "", label: "Trusted Community Location", tone: "primary" as const },
];

export default function AboutPage() {
  return (
    <>
      <Section tone="vivid" className="pb-12 pt-10 sm:pt-16">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="About BMR Pharmacy"
              title="Healthcare that knows your name"
              description="Established in 2019 by licensed pharmacist Bethel Ann Tiratira, BMR Pharmacy was founded with a simple mission: to make quality healthcare and trusted medications accessible to every member of the Morong community."
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.08}>
                <div
                  className={cn(
                    "rounded-xl p-6 text-center shadow-sm",
                    stat.tone === "primary" ? "bg-primary-light" : "bg-secondary-light"
                  )}
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className={cn(
                      "font-display text-2xl font-bold sm:text-3xl",
                      stat.tone === "primary" ? "text-primary" : "text-secondary-dark"
                    )}
                  />
                  <p className="mt-1 text-xs text-neutral-700 sm:text-sm">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Our Story */}
      <Section tone="default">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-4 text-neutral-700">
              <h2 className="font-display text-2xl font-bold text-neutral-900">Our Story</h2>
              <p>
                Established in 2019 by licensed pharmacist Bethel Ann Tiratira, BMR Pharmacy
                was founded with a simple mission: to make quality healthcare and trusted
                medications accessible to every member of the Morong community. What began
                as a neighborhood pharmacy has grown into a dependable healthcare partner,
                committed to providing professional pharmaceutical services with genuine
                care and compassion.
              </p>
              <p>
                At BMR Pharmacy, we believe that every patient deserves personalized
                attention, accurate medication guidance, and exceptional customer service.
                Our knowledgeable team works closely with customers to ensure they receive
                the right medications, proper counseling, and reliable health advice for
                their everyday needs.
              </p>
              <p>
                As a locally owned and family-operated pharmacy, we are proud to serve
                generations of families by building lasting relationships based on trust,
                integrity, and professional care.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section tone="secondary">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal hover>
              <Card className="border-t-4 border-t-primary bg-white">
                <CardHeader>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <p className="text-neutral-700">
                  To improve the health and well-being of our community by providing safe,
                  affordable, and high-quality pharmaceutical products and healthcare
                  services while delivering compassionate, patient-centered care.
                </p>
              </Card>
            </Reveal>
            <Reveal delay={0.1} hover>
              <Card className="border-t-4 border-t-secondary bg-white">
                <CardHeader>
                  <CardTitle>Our Vision</CardTitle>
                </CardHeader>
                <p className="text-neutral-700">
                  To become one of the most trusted community pharmacies in Rizal by
                  continuously providing accessible healthcare solutions, exceptional
                  customer service, and innovative pharmacy services that positively
                  impact the lives of our patients.
                </p>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Core Values */}
      <Section tone="default">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Our Commitment" title="Our Core Values" align="center" />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.08} hover>
                <Card
                  className={cn(
                    "border-t-4 bg-white text-center",
                    index % 2 === 0 ? "border-t-primary" : "border-t-secondary"
                  )}
                >
                  <value.icon
                    className={cn("mx-auto h-8 w-8", index % 2 === 0 ? "text-primary" : "text-secondary-dark")}
                    aria-hidden="true"
                  />
                  <CardTitle className="mt-3 text-base">{value.title}</CardTitle>
                  <CardDescription className="mt-2">{value.description}</CardDescription>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Pharmacy Information */}
      <Section tone="vividAlt">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Visit Us" title="Pharmacy Information" align="center" />
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
            {PHARMACY_INFO.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.05}>
                <div
                  className={cn(
                    "flex items-start gap-4 px-6 py-4",
                    index !== PHARMACY_INFO.length - 1 && "border-b border-neutral-100"
                  )}
                >
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm text-neutral-700">{item.value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Choose Us */}
      <Section tone="default">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Why Choose Us" title="Why Choose BMR Pharmacy?" align="center" />
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            {WHY_CHOOSE_US.map((reason, index) => (
              <Reveal key={reason} delay={index * 0.06}>
                <div className="flex items-start gap-3 rounded-xl bg-primary-light/60 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-sm text-neutral-700">{reason}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-neutral-500">
              At BMR Pharmacy, your health is our priority. We are dedicated to providing
              trusted pharmaceutical care, reliable healthcare products, and compassionate
              service whenever you need us.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}