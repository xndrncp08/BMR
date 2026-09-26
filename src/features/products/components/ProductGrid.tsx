"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onQuickView?: (product: Product) => void;
  onReset?: () => void;
}

export function ProductGrid({ products, onQuickView, onReset }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-20 text-center"
      >
        <span className="grid size-14 place-items-center rounded-2xl bg-neutral-100 text-neutral-500">
          <SearchX className="size-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-display text-xl font-bold text-neutral-900">No matching products</h2>
        <p className="mt-2 max-w-sm text-neutral-600">
          Try a different search, or ask our pharmacist — we may have it behind the counter.
        </p>
        {onReset && (
          <Button variant="secondary" className="mt-6" onClick={onReset}>
            Clear filters
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <AnimatePresence mode="popLayout" initial={false}>
        {products.map((product) => (
          <motion.li
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
          >
            <ProductCard product={product} onQuickView={onQuickView} headingLevel="h2" />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
