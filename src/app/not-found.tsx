import Link from "next/link";
import { Section, Container, buttonVariants } from "@/components/ui";

export default function NotFound() {
  return (
    <Section className="py-24 text-center">
      <Container>
        <p className="font-display text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-neutral-900">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-2 text-neutral-500">
          The page you're looking for may have moved or doesn't exist.
        </p>
        <Link href="/" className={`${buttonVariants({ variant: "primary" })} mt-8 inline-flex`}>
          Back to Home
        </Link>
      </Container>
    </Section>
  );
}
