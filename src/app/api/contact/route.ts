import { NextResponse } from "next/server";
import { contactSchema } from "@/features/contact/schema";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form for errors.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert(parsed.data);

  if (error) {
    console.error("Failed to insert contact message:", error.message);
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again or call us directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
