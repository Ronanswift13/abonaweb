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
  "变电站监测平台、值守语音汇报系统、后勤语音助手和自研行业大模型。";

export const metadata = pageMetadata({ title, description, path: "/products" });

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={[{ label: title, href: "/products" }]}
      />
      <section className="py-20">
        <Container
          className={cn(
            "grid grid-cols-1 items-stretch gap-6 md:grid-cols-2",
            products.length % 3 === 0 && "lg:grid-cols-3 lg:gap-8",
          )}
        >
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} headingLevel="h2" />
          ))}
        </Container>
      </section>
      <CTA content={home.cta} />
    </>
  );
}
