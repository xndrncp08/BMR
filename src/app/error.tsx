"use client";

import { useEffect } from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { Button, Container } from "@/components/ui";

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
    <section className="py-24 sm:py-32">
      <Container className="text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-error-light text-error">
          <TriangleAlert className="size-8" aria-hidden="true" />
        </span>
        <h1 className="mt-6 font-display text-display-md font-bold text-neutral-900">Something went wrong</h1>
        <p className="mx-auto mt-3 max-w-md text-lg text-neutral-600">
          Please try again, or contact us if the problem continues.
        </p>
        <Button className="mt-10" size="lg" onClick={() => reset()}>
          <RotateCcw aria-hidden="true" />
          Try again
        </Button>
      </Container>
    </section>
  );
}
