import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, Skeleton } from "@/components/ui";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Staff Login",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="bg-dot-grid mask-radial absolute inset-0" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-0 size-[32rem] -translate-x-1/2 rounded-full bg-primary-200/40 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="animate-rise mx-auto max-w-md">
          <Suspense fallback={<Skeleton className="h-96 rounded-3xl" />}>
            <LoginForm />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
