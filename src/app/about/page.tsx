import { HeartHandshake, ShieldCheck, Users, Award } from "lucide-react";
import { Section, Container, Card, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { SectionHeading } from "@/components/shared/SectionHeading";

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Compassion",
    description: "Every patient is treated like a neighbor, because most of them are.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "Clear, honest guidance — even when the answer is 'you don't need this.'",
  },
  {
    icon: Users,
    title: "Accessibility",
    description: "No appointment needed for a quick question. We're here when you need us.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Licensed, continuously trained pharmacists who take the details seriously.",
  },
];

// Placeholder team — replace with real staff bios and photos before launch.
const TEAM = [
  { name: "Dr. Amina Rahman", role: "Lead Pharmacist, PharmD" },
  { name: "Marcus Webb", role: "Staff Pharmacist" },
  { name: "Priya Nair", role: "Pharmacy Technician" },
  { name: "Sam Okafor", role: "Patient Services Coordinator" },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pb-12 pt-10 sm:pt-16">
        <Container>
          <SectionHeading
            eyebrow="About BMR Pharmacy"
            title="Healthcare that knows your name"
            description="We started BMR Pharmacy because our community deserved a pharmacy that treated prescriptions as the start of a conversation, not the end of one."
          />
        </Container>
      </Section>

      {/* Our Story */}
      <Section tone="muted">
        <Container>
          <div className="mx-auto max-w-3xl space-y-4 text-neutral-700">
            <h2 className="font-display text-2xl font-bold text-neutral-900">Our Story</h2>
            <p>
              BMR Pharmacy opened its doors with a simple idea: medication is
              only part of healthcare. The rest is guidance, patience, and
              being available when something doesn't feel right. What began
              as a single storefront has grown alongside the community it
              serves, but the daily work hasn't changed — filling
              prescriptions accurately, answering questions honestly, and
              treating every visit like it matters, because it does.
            </p>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <p className="text-neutral-700">
                To make expert pharmacy care accessible, personal, and
                genuinely helpful for every person who walks through our
                doors — or refills online at 11pm.
              </p>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <p className="text-neutral-700">
                A community where no one hesitates to ask a pharmacist a
                question, because they know they'll get a real, unhurried
                answer.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section tone="muted">
        <Container>
          <SectionHeading eyebrow="Our Commitment" title="What guides every visit" align="center" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <Card key={value.title} className="text-center">
                <value.icon className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
                <CardTitle className="mt-3">{value.title}</CardTitle>
                <CardDescription className="mt-2">{value.description}</CardDescription>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Meet the Team" title="The people behind the counter" align="center" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-light font-display text-xl font-bold text-primary">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <p className="mt-3 font-semibold text-neutral-900">{member.name}</p>
                <p className="text-sm text-neutral-500">{member.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
