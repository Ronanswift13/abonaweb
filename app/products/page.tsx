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
  "四个产品：变电站巡视与监测平台、值守用的语音汇报助手、办后勤业务的语音助手，以及自研行业大模型。每张卡片都写明了现在做到哪一步。";

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
