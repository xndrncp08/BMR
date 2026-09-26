import type { Metadata } from "next";
import { Container, Section } from "@/components/ui";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProductCatalog } from "@/features/products/components/ProductCatalog";
import { getAllProducts, getCategories } from "@/features/products/services/product-service";

export const metadata: Metadata = {
  title: "Products",
  description: "Vitamins, over-the-counter medicines, first aid, and medical devices from BMR Pharmacy.",
};

export default async function ProductsPage() {
  const products = await getAllProducts();
  const categories = getCategories(products);

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Wellness products"
        description="Trusted essentials for your family's health. Search, filter, or ask our pharmacist for a recommendation."
      />
      <Section className="pt-8 sm:pt-10">
        <Container>
          <ProductCatalog products={products} categories={categories} />
        </Container>
      </Section>
    </>
  );
}
