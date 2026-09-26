import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Clock, MessageCircle, Phone, ShieldCheck, Store } from "lucide-react";
import { Badge, Container, Section, buttonVariants } from "@/components/ui";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";
import { BUSINESS } from "@/lib/business";
import { getAllProducts, getProductById } from "@/features/products/services/product-service";
import { currency, getStockStatus } from "@/features/products/lib/presentation";
import { ProductVisual } from "@/features/products/components/ProductVisual";
import { ProductCard } from "@/features/products/components/ProductCard";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  return product ? { title: product.name, description: product.description } : {};
}

const ASSURANCES = [
  { icon: ShieldCheck, text: "Genuine products from a licensed pharmacy" },
  { icon: MessageCircle, text: "Free advice from our pharmacist" },
  { icon: Store, text: "Pick up in store — open 24 hours" },
];

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const stock = getStockStatus(product);
  const related = (await getAllProducts())
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Section className="pt-8 sm:pt-10">
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-neutral-600">
              <li>
                <Link href="/products" className="focus-ring rounded font-medium hover:text-primary-700">
                  Products
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-4 text-neutral-400" />
              </li>
              <li>{product.category}</li>
              <li aria-hidden="true">
                <ChevronRight className="size-4 text-neutral-400" />
              </li>
              <li aria-current="page" className="font-semibold text-neutral-900">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="animate-rise">
              <ProductVisual
                category={product.category}
                size="lg"
                className="aspect-square rounded-4xl border border-neutral-200"
              />
            </div>

            <div className="animate-rise delay-1 flex flex-col">
              <div className="flex flex-wrap gap-2">
                <Badge tone="neutral" size="md">
                  {product.category}
                </Badge>
                <Badge tone={stock.tone} size="md">
                  {stock.label}
                </Badge>
              </div>
              <h1 className="mt-5 font-display text-display-lg font-extrabold text-neutral-900">
                {product.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-neutral-700">{product.description}</p>

              <div className="mt-8 flex items-end gap-3 border-y border-neutral-200 py-6">
                <p className="font-display text-4xl font-extrabold tracking-tight text-neutral-900">
                  {currency.format(product.price)}
                </p>
                {product.stockQuantity > 0 && (
                  <p className="pb-1.5 text-sm text-neutral-600">{product.stockQuantity} available in store</p>
                )}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/contact?subject=${encodeURIComponent(`Question about ${product.name}`)}`}
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }), "flex-1")}
                >
                  <MessageCircle aria-hidden="true" />
                  Ask a pharmacist
                </Link>
                <a
                  href={BUSINESS.phone.href}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "flex-1")}
                >
                  <Phone aria-hidden="true" />
                  Call to reserve
                </a>
              </div>

              <ul className="mt-8 space-y-3 rounded-2xl bg-neutral-50 p-5">
                {ASSURANCES.map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-sm text-neutral-700">
                    <item.icon className="size-5 shrink-0 text-primary-600" aria-hidden="true" />
                    {item.text}
                  </li>
                ))}
                <li className="flex items-center gap-3 text-sm text-neutral-700">
                  <Clock className="size-5 shrink-0 text-primary-600" aria-hidden="true" />
                  {BUSINESS.address.short} · {BUSINESS.hours.short}
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="white" className="border-t border-neutral-200">
          <Container>
            <SectionHeading eyebrow="You may also need" title={`More in ${product.category}`} />
            <Stagger as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <StaggerItem as="li" key={item.id}>
                  <ProductCard product={item} />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}
    </>
  );
}
