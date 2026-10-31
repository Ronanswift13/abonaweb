
import { ProductCard } from "@/components/cards/ProductCard";
import { CTA } from "@/components/sections/CTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { capabilities, capabilitiesIntro } from "@/data/capabilities";
import { home } from "@/data/home";
import { getAllProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: capabilitiesIntro.title,
  description: capabilitiesIntro.description,
  path: "/capabilities",
});

export default function CapabilitiesPage() {
  const products = getAllProducts();

  return (
    <>
      <PageHeader
        title={capabilitiesIntro.title}
        description={capabilitiesIntro.description}
        breadcrumbs={[{ label: capabilitiesIntro.title, href: "/capabilities" }]}
      >
        {/* 能力锚点导航 */}
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {capabilities.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="text-sm text-brand-700 underline-offset-4 hover:underline"
              >
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </PageHeader>

      <section className="py-20">
        <Container className="divide-y divide-ink-200 border-y border-ink-200">
          {capabilities.map((c) => (
            <article id={c.id} key={c.id} className="grid gap-6 py-12 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="text-2xl font-bold text-ink-900">{c.title}</h2>
                <p className="mt-4 leading-relaxed text-ink-600">{c.summary}</p>
              </div>
              <ul className="space-y-3 lg:col-span-7">
                {c.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-ink-700">
                    <span className="mt-2.5 h-px w-3 shrink-0 bg-brand-700" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Container>
      </section>

      <section className="bg-ink-50/70 py-20">
        <Container>
          <SectionHeading {...home.products} align="center" />
          <div
            className={cn(
              "mt-12 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2",
              products.length % 3 === 0 && "lg:grid-cols-3 lg:gap-8",
            )}
          >
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <CTA content={home.cta} />
    </>
  );
}
