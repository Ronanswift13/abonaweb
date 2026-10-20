import { ProductCard } from "@/components/cards/ProductCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Product, SectionIntro } from "@/types";

/** 核心产品三列卡片 */
export function ProductSection({ intro, products }: { intro: SectionIntro; products: Product[] }) {
  return (
    <section className="relative bg-gradient-to-b from-white to-ink-50/60 py-20 sm:py-24">
      <Container>
        <SectionHeading {...intro} align="center" />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
