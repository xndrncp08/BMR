"use client";

import { useState } from "react";
import { useProductFilters } from "@/features/products/hooks/useProductFilters";
import type { Product } from "@/types/product";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";
import { ProductQuickView } from "./ProductQuickView";

interface ProductCatalogProps {
  products: Product[];
  categories: string[];
}

export function ProductCatalog({ products, categories }: ProductCatalogProps) {
  const filters = useProductFilters(products);
  // Keep the last product mounted so the dialog can animate out with content
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const count = filters.filteredProducts.length;

  return (
    <div className="space-y-8">
      <div className="sticky top-16 z-30 -mx-4 border-b border-neutral-200 bg-page/90 px-4 py-4 backdrop-blur-xl sm:top-[4.5rem] sm:mx-0 sm:rounded-2xl sm:border sm:bg-white/90 sm:p-4 sm:shadow-soft">
        <ProductFilters
          categories={categories}
          categoryCounts={filters.categoryCounts}
          totalCount={Object.values(filters.categoryCounts).reduce((a, b) => a + b, 0)}
          searchTerm={filters.searchTerm}
          onSearchChange={filters.setSearchTerm}
          selectedCategory={filters.selectedCategory}
          onCategoryChange={filters.setSelectedCategory}
          sort={filters.sort}
          onSortChange={filters.setSort}
        />
      </div>

      <div className="flex items-center justify-between">
        {/* Announced to screen readers as results change */}
        <p role="status" aria-live="polite" className="text-sm text-neutral-600">
          Showing <span className="font-semibold text-neutral-900">{count}</span>{" "}
          {count === 1 ? "product" : "products"}
          {filters.selectedCategory && (
            <>
              {" "}
              in <span className="font-semibold text-neutral-900">{filters.selectedCategory}</span>
            </>
          )}
        </p>
        {filters.hasActiveFilters && (
          <button
            type="button"
            onClick={filters.resetFilters}
            className="focus-ring rounded text-sm font-semibold text-primary-700 underline-offset-4 hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      <ProductGrid
        products={filters.filteredProducts}
        onReset={filters.resetFilters}
        onQuickView={(product) => {
          setQuickViewProduct(product);
          setQuickViewOpen(true);
        }}
      />

      <ProductQuickView
        product={quickViewProduct}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </div>
  );
}
