import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateProduct } from "@/features/dashboard/actions/product-actions";
import { Button } from "@/components/ui";
import { FormField } from "@/components/shared/FormField";
import { getInputClassName } from "@/components/shared/input-styles";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from("products").select("*").eq("id", id).single();

  if (!product) {
    notFound();
  }

  const updateWithId = updateProduct.bind(null, id);

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-display text-2xl font-bold text-neutral-900">Edit Product</h1>
      <form action={updateWithId} className="mt-6 space-y-5">
        <FormField label="Name" htmlFor="name" required>
          <input id="name" name="name" defaultValue={product.name} required className={getInputClassName()} />
        </FormField>
        <FormField label="Description" htmlFor="description" required>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={product.description}
            required
            className={getInputClassName()}
          />
        </FormField>
        <FormField label="Category" htmlFor="category" required>
          <input
            id="category"
            name="category"
            defaultValue={product.category}
            required
            className={getInputClassName()}
          />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Price" htmlFor="price" required>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              defaultValue={product.price}
              required
              className={getInputClassName()}
            />
          </FormField>
          <FormField label="Stock Quantity" htmlFor="stockQuantity" required>
            <input
              id="stockQuantity"
              name="stockQuantity"
              type="number"
              min="0"
              defaultValue={product.stock_quantity}
              required
              className={getInputClassName()}
            />
          </FormField>
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}
