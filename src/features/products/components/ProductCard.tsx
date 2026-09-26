import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { currency, getStockStatus } from "../lib/presentation";
import { ProductVisual } from "./ProductVisual";

interface ProductCardProps {
  product: Product;
  /** When provided, shows a Quick view button that opens a modal. */
  onQuickView?: (product: Product) => void;
  headingLevel?: "h2" | "h3";
}

/**
 * The whole card is clickable via a "stretched link" on the title (its
 * ::after covers the card), which keeps a single, well-named link in the
 * tab order. Quick view sits above that overlay as its own button — nesting
 * a button inside a link would be invalid HTML.
 */
export function ProductCard({ product, onQuickView, headingLevel: Heading = "h3" }: ProductCardProps) {
  const stock = getStockStatus(product);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs",
        "transition-[box-shadow,transform,border-color] duration-300 ease-out-expo",
        "hover:-translate-y-1 hover:border-primary-200 hover:shadow-lift motion-reduce:hover:translate-y-0",
        "has-[:focus-visible]:border-primary-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-500 has-[:focus-visible]:ring-offset-2",
      )}
    >
      <div className="relative">
        <ProductVisual category={product.category} className="aspect-[4/3]" />
        <Badge tone={stock.tone} className="absolute left-3 top-3 bg-white/90 backdrop-blur">
          {stock.label}
        </Badge>
        {onQuickView && (
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className={cn(
              "focus-ring absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-neutral-800 shadow-soft backdrop-blur",
              "transition-[opacity,transform,background-color] duration-300 ease-out-expo hover:bg-white hover:text-primary-700",
              // Always visible on touch; revealed on hover/focus with a pointer
              "[@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:opacity-0",
              "[@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100",
              "[@media(hover:hover)]:focus-visible:translate-y-0 [@media(hover:hover)]:focus-visible:opacity-100",
            )}
          >
            <Eye className="size-3.5" aria-hidden="true" />
            Quick view<span className="sr-only">: {product.name}</span>
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary-700">
          {product.category}
        </p>
        <Heading className="mt-1.5 font-display text-lg font-bold leading-snug tracking-tight text-neutral-900">
          <Link
            href={`/products/${product.id}`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {product.name}
          </Link>
        </Heading>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-neutral-600">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <p className="font-display text-xl font-bold tracking-tight text-neutral-900">
            {currency.format(product.price)}
          </p>
          <span
            className="grid size-9 place-items-center rounded-full bg-neutral-100 text-neutral-600 transition-[background-color,color,transform] duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:bg-primary-600 group-hover:text-white"
            aria-hidden="true"
          >
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
