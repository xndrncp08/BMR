import { NextResponse } from "next/server";
import { prescriptionRefillSchema } from "@/features/prescriptions/schema";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = prescriptionRefillSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form for errors.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { customerName, email, phone, medicineName, prescriptionNumber, notes } = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.from("prescription_requests").insert({
    customer_name: customerName,
    email,
    phone,
    medicine_name: medicineName,
    prescription_number: prescriptionNumber || null,
    notes: notes || null,
  });

  if (error) {
    console.error("Failed to insert prescription request:", error.message);
    return NextResponse.json(
      { error: "We couldn't submit your request. Please try again or call us directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
