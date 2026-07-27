"use client";

import { useProductFilters } from "@/features/products/hooks/useProductFilters";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";
import type { Product } from "@/types/product";

interface ProductCatalogProps {
  products: Product[];
  categories: string[];
}

export function ProductCatalog({ products, categories }: ProductCatalogProps) {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
  } = useProductFilters(products);

  return (
    <div className="space-y-8">
      <ProductFilters
        categories={categories}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
