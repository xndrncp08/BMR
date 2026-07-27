import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

/**
 * Call this inside Server Components, Route Handlers, or Server Actions.
 * `cookies()` is async as of Next.js 15+, so this function is async too —
 * always `await createClient()` at the call site.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll is called from a Server Component in some cases,
            // where cookies can't be mutated. Safe to ignore if you have
            // middleware refreshing the session (added in Milestone 11).
          }
        },
      },
    }
  );
}