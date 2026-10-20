import { Check } from "lucide-react";

import { ProductCard } from "@/components/cards/ProductCard";
import { CTA } from "@/components/sections/CTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
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
        eyebrow={capabilitiesIntro.eyebrow}
        title={capabilitiesIntro.title}
        description={capabilitiesIntro.description}
        breadcrumbs={[{ label: capabilitiesIntro.title, href: "/capabilities" }]}
      >
        {/* 能力锚点导航 */}
        <ul className="mt-8 flex flex-wrap gap-2">
          {capabilities.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                <Icon name={c.icon} className="size-4 text-brand-600" />
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </PageHeader>

      <section className="py-20">
        <Container className="space-y-6">
          {capabilities.map((c, index) => (
            <article
              id={c.id}
              key={c.id}
              className="grid gap-8 rounded-3xl border border-ink-100 bg-white p-8 shadow-card sm:p-10 lg:grid-cols-12 lg:items-center"
            >
              <div className={cn("lg:col-span-5", index % 2 === 1 && "lg:order-2 lg:col-start-8")}>
                <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                  <Icon name={c.icon} className="size-7" />
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">{c.subtitle}</p>
                <h2 className="mt-2 text-2xl font-bold text-ink-900 sm:text-3xl">{c.title}</h2>
                <p className="mt-4 leading-relaxed text-ink-500">{c.summary}</p>
              </div>
              <ul className={cn("grid gap-3 sm:grid-cols-2 lg:col-span-6", index % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")}>
                {c.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 rounded-2xl bg-ink-50 p-4 text-sm text-ink-700">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
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
          <div className={cn("mt-12 grid gap-6 md:grid-cols-2", products.length % 3 === 0 && "lg:grid-cols-3")}>
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
