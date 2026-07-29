import Link from "next/link";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-300 py-16 text-center">
        <p className="text-neutral-500">No products match your search.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <Link key={product.id} href={`/products/${product.id}`} className="block">
          <ProductCard product={product} accent={index % 2 === 0 ? "primary" : "secondary"} />
        </Link>
      ))}
    </div>
  );
}