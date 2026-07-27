import { createProduct } from "@/features/dashboard/actions/product-actions";
import { Button } from "@/components/ui";
import { FormField } from "@/components/shared/FormField";
import { getInputClassName } from "@/components/shared/input-styles";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-display text-2xl font-bold text-neutral-900">Add Product</h1>
      <form action={createProduct} className="mt-6 space-y-5">
        <FormField label="Name" htmlFor="name" required>
          <input id="name" name="name" required className={getInputClassName()} />
        </FormField>
        <FormField label="Description" htmlFor="description" required>
          <textarea id="description" name="description" rows={3} required className={getInputClassName()} />
        </FormField>
        <FormField label="Category" htmlFor="category" required>
          <input id="category" name="category" required className={getInputClassName()} />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Price" htmlFor="price" required>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
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
              required
              className={getInputClassName()}
            />
          </FormField>
        </div>
        <Button type="submit">Create Product</Button>
      </form>
    </div>
  );
}
