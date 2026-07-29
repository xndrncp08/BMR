import { cn } from "@/lib/utils";
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
  accent?: "primary" | "secondary";
}

const currency = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

export function ProductCard({ product, accent = "primary" }: ProductCardProps) {
  const isPrimary = accent === "primary";

  return (
    <Card
      className={cn(
        "flex flex-col border-t-4",
        isPrimary ? "border-t-primary" : "border-t-secondary",
      )}
    >
      <div
        className={cn(
          "flex h-32 items-center justify-center rounded-lg font-display text-2xl font-bold",
          isPrimary
            ? "bg-primary-light text-primary"
            : "bg-secondary-light text-secondary",
        )}
      >
        {product.name.charAt(0)}
      </div>
      <CardHeader className="mt-4">
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-wide",
            isPrimary ? "text-secondary" : "text-primary",
          )}
        >
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
