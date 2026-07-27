"use client";

import { useEffect } from "react";
import { Section, Container, Button } from "@/components/ui";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, send this to an error-tracking service (Sentry, etc.)
    console.error(error);
  }, [error]);

  return (
    <Section className="py-24 text-center">
      <Container>
        <h1 className="font-display text-2xl font-bold text-neutral-900">
          Something went wrong
        </h1>
        <p className="mt-2 text-neutral-500">
          Please try again, or contact us if the problem continues.
        </p>
        <Button className="mt-8" onClick={() => reset()}>
          Try Again
        </Button>
      </Container>
    </Section>
  );
}
