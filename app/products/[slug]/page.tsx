import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CirclePlay } from "lucide-react";

import { CaseCard } from "@/components/cards/CaseCard";
import { CTA } from "@/components/sections/CTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { home } from "@/data/home";
import { getAllProducts, getCasesByProduct, getProduct } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

// 仅生成 data/products.ts 中存在的产品，其余路径返回 404
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({ title: product.name, description: product.summary, path: `/products/${slug}` });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const relatedCases = getCasesByProduct(product.slug);

  return (
    <>
      <PageHeader
        eyebrow={product.tag}
        title={product.name}
        description={product.description}
        breadcrumbs={[
          { label: "产品与解决方案", href: "/products" },
          { label: product.name, href: `/products/${product.slug}` },
        ]}
      >
        {product.nameEn && <p className="mt-2 text-lg font-semibold text-brand-700">{product.nameEn}</p>}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact#solution" size="lg" arrow>
            获取解决方案
          </ButtonLink>
          {product.demo && (
            <ButtonLink
              href="#demo"
              variant="secondary"
              size="lg"
              icon={<CirclePlay className="size-5 text-brand-600" aria-hidden="true" />}
            >
              观看产品演示
            </ButtonLink>
          )}
        </div>
      </PageHeader>

      {/* 核心功能 */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="FEATURES" title="核心功能" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {product.features.map((feature) => (
              <article key={feature.title} className="flex gap-5 rounded-3xl border border-ink-100 bg-white p-7 shadow-card">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient-soft text-brand-600 ring-1 ring-brand-100">
                  <Icon name={feature.icon ?? product.icon} className="size-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-ink-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 应用场景 */}
      <section className="bg-ink-50/70 py-20">
        <Container>
          <SectionHeading eyebrow="SCENARIOS" title="应用场景" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.scenarios.map((scenario, index) => (
              <li key={scenario} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
                <span className="text-gradient text-2xl font-bold">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-semibold text-ink-800">{scenario}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 产品演示（占位） */}
      {product.demo && (
        <section id="demo" className="py-20">
          <Container>
            <div className="relative isolate flex aspect-video max-h-[520px] w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-night-gradient p-8 text-center">
              <div className="absolute inset-0 -z-10 bg-grid-dark bg-grid opacity-60" aria-hidden="true" />
              <div className="absolute -z-10 size-72 rounded-full bg-brand-500/25 blur-3xl" aria-hidden="true" />
              {/* 【占位】替换为 <video> 或第三方视频嵌入 */}
              <span className="flex size-20 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/30 backdrop-blur">
                <CirclePlay className="size-10" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-2xl font-bold text-white">{product.demo.title}</h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-300 sm:text-base">{product.demo.description}</p>
              <ButtonLink href="/contact" variant="light" className="mt-6">
                预约演示
              </ButtonLink>
            </div>
          </Container>
        </section>
      )}

      {/* 相关案例 */}
      {relatedCases.length > 0 && (
        <section className="pb-4 pt-4">
          <Container>
            <SectionHeading eyebrow="CASE STUDIES" title="相关案例" />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedCases.map((item) => (
                <CaseCard key={item.slug} item={item} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTA content={home.cta} />
    </>
  );
}
