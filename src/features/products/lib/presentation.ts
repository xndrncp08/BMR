import { Baby, Bandage, Droplets, Leaf, Pill, Tablets, Thermometer, type LucideIcon } from "lucide-react";
import type { Product } from "@/types/product";

export const currency = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

interface CategoryVisual {
  icon: LucideIcon;
  /** Tile background + icon color. Kept within the brand palette. */
  tile: string;
  iconClass: string;
}

const CATEGORY_VISUALS: Record<string, CategoryVisual> = {
  Vitamins: { icon: Leaf, tile: "from-primary-50 to-primary-100", iconClass: "text-primary-600" },
  "Over-the-Counter": { icon: Tablets, tile: "from-primary-50 to-primary-200/70", iconClass: "text-primary-700" },
  "Medical Devices": { icon: Thermometer, tile: "from-neutral-50 to-neutral-200", iconClass: "text-neutral-700" },
  "First Aid": { icon: Bandage, tile: "from-accent-50 to-accent-100", iconClass: "text-accent-600" },
  "Baby & Child": { icon: Baby, tile: "from-primary-50 to-neutral-100", iconClass: "text-primary-600" },
  "Personal Care": { icon: Droplets, tile: "from-neutral-50 to-primary-100", iconClass: "text-primary-700" },
};

const FALLBACK: CategoryVisual = {
  icon: Pill,
  tile: "from-primary-50 to-primary-100",
  iconClass: "text-primary-600",
};

/**
 * Products don't have photography yet (imageUrl is null in the catalog),
 * so each category gets a distinct illustrated tile instead of a letter.
 */
export function getCategoryVisual(category: string): CategoryVisual {
  return CATEGORY_VISUALS[category] ?? FALLBACK;
}

export type StockStatus = { label: string; tone: "primary" | "warning" | "neutral" };

export const LOW_STOCK_THRESHOLD = 30;

export function getStockStatus(product: Pick<Product, "stockQuantity">): StockStatus {
  if (product.stockQuantity <= 0) return { label: "Out of stock", tone: "neutral" };
  if (product.stockQuantity < LOW_STOCK_THRESHOLD) return { label: "Low stock", tone: "warning" };
  return { label: "In stock", tone: "primary" };
}
