import type { Product } from "@/types/product";
import { PRODUCTS } from "@/features/products/data/products";

/**
 * NOTE: This is an in-memory mock implementation backed by static data.
 * In Milestone 8 these function bodies will be rewritten to query
 * Supabase — their signatures (and every place that calls them) stay
 * exactly the same. That's the point of isolating data access here
 * instead of importing PRODUCTS directly into components.
 */

export async function getAllProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProductById(id: string): Promise<Product | null> {
  return PRODUCTS.find((product) => product.id === id) ?? null;
}

export function getCategories(products: Product[]): string[] {
  return Array.from(new Set(products.map((product) => product.category))).sort();
}
