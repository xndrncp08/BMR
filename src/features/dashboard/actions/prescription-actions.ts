"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type PrescriptionStatus = Database["public"]["Tables"]["prescription_requests"]["Row"]["status"];

export async function updatePrescriptionStatus(id: string, formData: FormData) {
  const status = String(formData.get("status")) as PrescriptionStatus;
  const supabase = await createClient();
  const { error } = await supabase
    .from("prescription_requests")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/prescriptions");
}
