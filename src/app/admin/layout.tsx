import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/features/auth/actions";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui";
import { AdminNav } from "@/features/dashboard/components/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Defense in depth: middleware already redirects unauthenticated users,
  // this is a second check in case middleware config ever drifts.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-[calc(100vh-4.5rem)] flex-col sm:flex-row">
      <aside className="w-full shrink-0 border-b border-neutral-200 bg-white p-6 sm:w-60 sm:border-b-0 sm:border-r">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">Admin</p>
        <p className="mt-1 truncate text-sm text-neutral-700">{user.email}</p>
        <AdminNav />
        <form action={signOut} className="mt-6">
          <Button variant="outline" size="sm" type="submit" className="w-full">
            <LogOut aria-hidden="true" />
            Sign out
          </Button>
        </form>
      </aside>
      <div className="flex-1 bg-neutral-50 p-6 sm:p-10">{children}</div>
    </div>
  );
}
