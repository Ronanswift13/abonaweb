import { ProductCard } from "@/components/cards/ProductCard";
import { CTA } from "@/components/sections/CTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { home } from "@/data/home";
import { getAllProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

const title = "产品与解决方案";
const description =
  "变电站智能监测平台、自研行业大模型、主动 AI 智能体与智慧后勤 AI 助手，覆盖感知、认知、决策与服务全链路。";

export const metadata = pageMetadata({ title, description, path: "/products" });

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <>
      <PageHeader
        eyebrow="PRODUCTS & SOLUTIONS"
        title={title}
        description={description}
        breadcrumbs={[{ label: title, href: "/products" }]}
      />
      <section className="py-20">
        <Container className={cn("grid gap-6 md:grid-cols-2", products.length % 3 === 0 && "lg:grid-cols-3")}>
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} headingLevel="h2" />
          ))}
        </Container>
      </section>
      <CTA content={home.cta} />
    </>
  );
}
