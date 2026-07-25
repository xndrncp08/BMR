import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Container, Section } from "@/components/ui";

/**
 * TEMPORARY style-guide preview.
 * This page exists only so we can visually verify the design system.
 * It will be replaced by the real homepage in Milestone 4.
 */
export default function Home() {
  return (
    <main>
      <Section>
        <Container>
          <h1 className="font-display text-4xl font-bold text-neutral-900">
            BMR Pharmacy — Design System
          </h1>
          <p className="mt-2 max-w-xl text-neutral-500">
            Milestone 2 preview. Real homepage content arrives in Milestone 4.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button variant="primary">Refill Prescription</Button>
            <Button variant="secondary">Book Consultation</Button>
            <Button variant="outline">Learn More</Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-neutral-900">
            Services Preview
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Prescription Refills</CardTitle>
                <CardDescription>Fast, reliable, and tracked.</CardDescription>
              </CardHeader>
              <CardContent>
                Submit a refill request online and pick up in-store or have it delivered.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Medication Consultation</CardTitle>
                <CardDescription>One-on-one with a pharmacist.</CardDescription>
              </CardHeader>
              <CardContent>
                Get personalized guidance on dosage, interactions, and side effects.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Wellness Products</CardTitle>
                <CardDescription>Curated, trusted, in stock.</CardDescription>
              </CardHeader>
              <CardContent>
                Vitamins, supplements, and everyday health essentials.
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
