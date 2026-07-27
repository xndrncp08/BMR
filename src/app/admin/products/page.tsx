import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteProduct } from "@/features/dashboard/actions/product-actions";
import { buttonVariants } from "@/components/ui";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-neutral-900">Products</h1>
        <Link href="/admin/products/new" className={buttonVariants({ variant: "primary" })}>
          Add Product
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-neutral-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((product) => (
              <tr key={product.id} className="border-t border-neutral-100">
                <td className="px-4 py-3 font-medium text-neutral-900">{product.name}</td>
                <td className="px-4 py-3 text-neutral-500">{product.category}</td>
                <td className="px-4 py-3">${product.price}</td>
                <td className="px-4 py-3">{product.stock_quantity}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="mr-3 text-primary hover:text-primary-dark"
                  >
                    Edit
                  </Link>
                  <form action={deleteProduct.bind(null, product.id)} className="inline">
                    <button type="submit" className="text-error hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {(products ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
