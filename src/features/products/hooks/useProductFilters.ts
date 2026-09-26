"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name: A–Z" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

interface UseProductFiltersResult {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  sort: SortOption;
  setSort: (sort: SortOption) => void;
  /** Number of products per category for the current search term. */
  categoryCounts: Record<string, number>;
  filteredProducts: Product[];
  hasActiveFilters: boolean;
  resetFilters: () => void;
}

function matchesQuery(product: Product, query: string) {
  return (
    query.length === 0 ||
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );
}

export function useProductFilters(products: Product[]): UseProductFiltersResult {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("featured");

  const query = searchTerm.trim().toLowerCase();

  const searchMatches = useMemo(
    () => products.filter((product) => matchesQuery(product, query)),
    [products, query],
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const product of searchMatches) {
      counts[product.category] = (counts[product.category] ?? 0) + 1;
    }
    return counts;
  }, [searchMatches]);

  const filteredProducts = useMemo(() => {
    const result = searchMatches.filter(
      (product) => !selectedCategory || product.category === selectedCategory,
    );
    switch (sort) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "name":
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return result;
    }
  }, [searchMatches, selectedCategory, sort]);

  const hasActiveFilters = query.length > 0 || selectedCategory !== null;

  function resetFilters() {
    setSearchTerm("");
    setSelectedCategory(null);
  }

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sort,
    setSort,
    categoryCounts,
    filteredProducts,
    hasActiveFilters,
    resetFilters,
  };
}
