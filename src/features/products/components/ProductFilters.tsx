"use client";

import { useId, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SORT_OPTIONS, type SortOption } from "../hooks/useProductFilters";

interface ProductFiltersProps {
  categories: string[];
  categoryCounts: Record<string, number>;
  totalCount: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function ProductFilters({
  categories,
  categoryCounts,
  totalCount,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sort,
  onSortChange,
}: ProductFiltersProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const sortId = useId();

  const chips: { value: string | null; label: string; count: number }[] = [
    { value: null, label: "All", count: totalCount },
    ...categories.map((category) => ({
      value: category,
      label: category,
      count: categoryCounts[category] ?? 0,
    })),
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-500"
            aria-hidden="true"
          />
          <input
            ref={searchRef}
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape" && searchTerm) {
                event.preventDefault();
                onSearchChange("");
              }
            }}
            placeholder="Search vitamins, first aid, devices…"
            aria-label="Search products"
            className={cn(
              "h-12 w-full rounded-xl border border-neutral-400 bg-white pl-12 pr-12 text-base text-neutral-900 shadow-xs",
              "placeholder:text-neutral-500 transition-[border-color,box-shadow] duration-200",
              "hover:border-neutral-500 focus:border-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-600/15",
              // Hide the native WebKit clear button; we render our own
              "[&::-webkit-search-cancel-button]:appearance-none",
            )}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                onSearchChange("");
                searchRef.current?.focus();
              }}
              className="focus-ring absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              aria-label="Clear search"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="relative sm:w-56">
          <label htmlFor={sortId} className="sr-only">
            Sort products
          </label>
          <ArrowUpDown
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-500"
            aria-hidden="true"
          />
          <select
            id={sortId}
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-neutral-400 bg-white pl-10 pr-10 text-[0.9375rem] font-medium text-neutral-800 shadow-xs transition-[border-color,box-shadow] hover:border-neutral-500 focus:border-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-600/15"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-neutral-500"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Chips scroll horizontally on small screens instead of wrapping */}
      <div
        role="group"
        aria-label="Filter by category"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {chips.map((chip) => {
          const active = selectedCategory === chip.value;
          const empty = chip.count === 0 && !active;
          return (
            <button
              key={chip.label}
              type="button"
              onClick={() => onCategoryChange(chip.value)}
              aria-pressed={active}
              disabled={empty}
              className={cn(
                "focus-ring relative isolate inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-[color,border-color,opacity] duration-200 active:scale-[0.97]",
                active
                  ? "border-primary-600 text-white"
                  : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400 hover:text-neutral-900",
                empty && "opacity-45",
              )}
            >
              {active && (
                <motion.span
                  layoutId="category-chip-active"
                  className="absolute inset-0 -z-10 rounded-full bg-primary-600"
                  transition={{ type: "spring", stiffness: 450, damping: 36 }}
                />
              )}
              {chip.label}
              <span
                className={cn(
                  "min-w-5 rounded-full px-1.5 text-center text-xs tabular-nums",
                  active ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600",
                )}
              >
                {chip.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
