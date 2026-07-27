import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

/**
 * Call this inside Client Components. Uses the public anon key, so it's
 * safe to expose to the browser — every query still goes through Row
 * Level Security policies defined on each table.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}