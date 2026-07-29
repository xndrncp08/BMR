import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Container, buttonVariants } from "@/components/ui";
import { cn } from "@/lib/utils";
import { getProductById } from "@/features/products/services/product-service";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

const currency = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <Section className="pb-16 pt-10 sm:pt-16">
      <Container>
        <Link
          href="/products"
          className="text-sm font-medium text-primary hover:text-primary-dark"
        >
          ← Back to Products
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div className="flex aspect-square items-center justify-center rounded-2xl bg-primary-light font-display text-6xl font-bold text-primary">
            {product.name.charAt(0)}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
              {product.category}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-neutral-900">
              {product.name}
            </h1>
            <p className="mt-4 text-neutral-700">{product.description}</p>
            <p className="mt-6 font-display text-2xl font-bold text-neutral-900">
              {currency.format(product.price)}
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              {product.stockQuantity > 0
                ? `${product.stockQuantity} in stock`
                : "Out of stock"}
            </p>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "mt-8",
              )}
            >
              Ask a Pharmacist
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
