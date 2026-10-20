import { ProductCard } from "@/components/cards/ProductCard";
import { CTA } from "@/components/sections/CTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { home } from "@/data/home";
import { getAllProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const title = "产品与解决方案";
const description = "自研大模型、变电站智能监测平台与主动 AI 智能体，覆盖感知、认知与决策全链路。";

export const metadata = pageMetadata({ title, description, path: "/products" });

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="PRODUCTS & SOLUTIONS"
        title={title}
        description={description}
        breadcrumbs={[{ label: title, href: "/products" }]}
      />
      <section className="py-20">
        <Container className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {getAllProducts().map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </Container>
      </section>
      <CTA content={home.cta} />
    </>
  );
}
