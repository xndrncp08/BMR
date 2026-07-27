"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createProduct(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").insert({
    name: String(formData.get("name")),
    description: String(formData.get("description")),
    category: String(formData.get("category")),
    price: Number(formData.get("price")),
    stock_quantity: Number(formData.get("stockQuantity")),
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .update({
      name: String(formData.get("name")),
      description: String(formData.get("description")),
      category: String(formData.get("category")),
      price: Number(formData.get("price")),
      stock_quantity: Number(formData.get("stockQuantity")),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/admin/products");
}
