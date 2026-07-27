import { Suspense } from "react";
import { Section, Container } from "@/components/ui";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <Section className="pb-16 pt-10 sm:pt-16">
      <Container>
        <div className="mx-auto max-w-sm">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </Container>
    </Section>
  );
}
