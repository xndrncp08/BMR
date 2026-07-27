import { createClient } from "@/lib/supabase/server";
import { updatePrescriptionStatus } from "@/features/dashboard/actions/prescription-actions";

const STATUS_OPTIONS = ["pending", "in_progress", "ready", "completed", "cancelled"] as const;

export default async function AdminPrescriptionsPage() {
  const supabase = await createClient();
  const { data: requests } = await supabase
    .from("prescription_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-neutral-900">Prescription Requests</h1>
      <div className="mt-6 space-y-4">
        {(requests ?? []).map((req) => (
          <div key={req.id} className="rounded-xl border border-neutral-100 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-neutral-900">{req.customer_name}</p>
                <p className="text-sm text-neutral-500">
                  {req.email} · {req.phone}
                </p>
                <p className="mt-2 text-sm text-neutral-700">Medicine: {req.medicine_name}</p>
                {req.prescription_number && (
                  <p className="text-sm text-neutral-500">Rx #: {req.prescription_number}</p>
                )}
                {req.notes && <p className="mt-1 text-sm text-neutral-500">Notes: {req.notes}</p>}
              </div>
              <form action={updatePrescriptionStatus.bind(null, req.id)} className="flex items-center gap-2">
                <select
                  name="status"
                  defaultValue={req.status}
                  className="rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s.replace("_", " ")}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-dark"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        ))}
        {(requests ?? []).length === 0 && (
          <p className="text-neutral-500">No prescription requests yet.</p>
        )}
      </div>
    </div>
  );
}
