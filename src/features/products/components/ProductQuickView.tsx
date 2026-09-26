"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { Badge, buttonVariants } from "@/components/ui";
import { Dialog } from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { currency, getStockStatus } from "../lib/presentation";
import { ProductVisual } from "./ProductVisual";

interface ProductQuickViewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductQuickView({ product, open, onOpenChange }: ProductQuickViewProps) {
  // Keep rendering the last product while the exit animation plays
  if (!product) return null;
  const stock = getStockStatus(product);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} title={product.name} hideTitle>
      <div className="grid sm:grid-cols-2">
        <ProductVisual category={product.category} size="lg" className="aspect-square sm:aspect-auto sm:h-full" />
        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="neutral">{product.category}</Badge>
            <Badge tone={stock.tone}>{stock.label}</Badge>
          </div>
          <p className="mt-4 font-display text-2xl font-bold tracking-tight text-neutral-900" aria-hidden="true">
            {product.name}
          </p>
          <p className="mt-2 leading-relaxed text-neutral-600">{product.description}</p>
          <p className="mt-6 font-display text-3xl font-bold tracking-tight text-neutral-900">
            {currency.format(product.price)}
          </p>
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-primary-50 p-3 text-sm text-primary-900">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary-600" aria-hidden="true" />
            Not sure it&apos;s right for you? Our licensed pharmacist can advise — no appointment needed.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:mt-auto sm:pt-6">
            <Link
              href={`/products/${product.id}`}
              onClick={() => onOpenChange(false)}
              className={cn(buttonVariants({ variant: "primary" }), "w-full")}
            >
              View full details
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              onClick={() => onOpenChange(false)}
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              <MessageCircle aria-hidden="true" />
              Ask a pharmacist
            </Link>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
