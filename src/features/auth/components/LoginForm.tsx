"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button, Card, CardHeader, CardTitle } from "@/components/ui";
import { FormField } from "@/components/shared/FormField";
import { getInputClassName } from "@/components/shared/input-styles";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError("Invalid email or password.");
      return;
    }

    const redirectTo = searchParams.get("redirectTo") || "/admin";
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Login</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div role="alert" className="rounded-md bg-error-light px-4 py-3 text-sm text-error">
            {error}
          </div>
        )}
        <FormField label="Email" htmlFor="email" required>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className={getInputClassName()}
          />
        </FormField>
        <FormField label="Password" htmlFor="password" required>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className={getInputClassName()}
          />
        </FormField>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Card>
  );
}
