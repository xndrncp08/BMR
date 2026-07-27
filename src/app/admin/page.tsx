import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader, CardTitle } from "@/components/ui";

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [{ count: productCount }, { count: pendingCount }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase
      .from("prescription_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-neutral-900">Overview</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <p className="font-display text-3xl font-bold text-primary">{productCount ?? 0}</p>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Prescription Requests</CardTitle>
          </CardHeader>
          <p className="font-display text-3xl font-bold text-primary">{pendingCount ?? 0}</p>
        </Card>
      </div>
    </div>
  );
}
