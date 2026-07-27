import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/features/auth/actions";
import { Button } from "@/components/ui";

const ADMIN_NAV = [
  { label: "Overview", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Prescriptions", href: "/admin/prescriptions" },
];

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
    <div className="flex min-h-[calc(100vh-5rem)] flex-col sm:flex-row">
      <aside className="w-full shrink-0 border-b border-neutral-100 bg-white p-6 sm:w-56 sm:border-b-0 sm:border-r">
        <p className="font-display text-lg font-bold text-neutral-900">Admin</p>
        <nav className="mt-6 flex flex-col gap-1">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={signOut} className="mt-6">
          <Button variant="outline" size="sm" type="submit" className="w-full">
            Sign Out
          </Button>
        </form>
      </aside>
      <div className="flex-1 bg-neutral-50 p-8">{children}</div>
    </div>
  );
}
