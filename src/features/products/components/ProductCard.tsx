import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col">
      {/* Placeholder visual until real product photography (Supabase Storage) lands in Milestone 8 */}
      <div className="flex h-32 items-center justify-center rounded-lg bg-primary-light font-display text-2xl font-bold text-primary">
        {product.name.charAt(0)}
      </div>
      <CardHeader className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
          {product.category}
        </p>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto pt-2">
        <p className="font-display text-lg font-bold text-neutral-900">
          {currency.format(product.price)}
        </p>
      </CardContent>
    </Card>
  );
}
