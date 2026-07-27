import type { Metadata } from "next";
import { Section, Container } from "@/components/ui";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProductCatalog } from "@/features/products/components/ProductCatalog";
import { getAllProducts, getCategories } from "@/features/products/services/product-service";

export const metadata: Metadata = {
  title: "Products — BMR Pharmacy",
};

export default async function ProductsPage() {
  const products = await getAllProducts();
  const categories = getCategories(products);

  return (
    <Section className="pb-16 pt-10 sm:pt-16">
      <Container>
        <SectionHeading
          eyebrow="Shop"
          title="Wellness Products"
          description="Search or filter by category to find what you need."
        />
        <div className="mt-10">
          <ProductCatalog products={products} categories={categories} />
        </div>
      </Container>
    </Section>
  );
}