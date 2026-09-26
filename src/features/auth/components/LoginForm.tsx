"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui";
import { FormField } from "@/components/shared/FormField";
import { FormAlert } from "@/components/shared/FormAlert";
import { getInputClassName } from "@/components/shared/input-styles";
import { LogoMark } from "@/components/layout/Logo";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-lift sm:p-10">
      <LogoMark className="size-12 rounded-2xl" />
      <h1 className="mt-6 font-display text-2xl font-bold tracking-tight text-neutral-900">Staff login</h1>
      <p className="mt-1 text-neutral-600">Sign in to manage products and prescription requests.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {error && <FormAlert>{error}</FormAlert>}
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
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className={`${getInputClassName()} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="focus-ring absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <EyeOff className="size-4" aria-hidden="true" />
              ) : (
                <Eye className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </FormField>
        <Button type="submit" size="lg" className="w-full" loading={loading}>
          {!loading && <LockKeyhole aria-hidden="true" />}
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
