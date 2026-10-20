import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import { CTA } from "@/components/sections/CTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Markdown } from "@/components/ui/Markdown";
import { home } from "@/data/home";
import { getAllCases, getCase, getProduct } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cases/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) return {};
  return pageMetadata({ title: item.title, description: item.summary, path: `/cases/${slug}` });
}

export default async function CaseDetailPage({ params }: PageProps<"/cases/[slug]">) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) notFound();

  const relatedProducts = item.products.map(getProduct).filter((p) => p !== undefined);

  const meta = [
    { label: "客户", value: item.client },
    { label: "行业", value: item.industry },
    { label: "时间", value: formatDate(item.date) },
  ];

  return (
    <>
      <PageHeader
        eyebrow={item.industry}
        title={item.title}
        description={item.summary}
        breadcrumbs={[
          { label: "项目案例", href: "/cases" },
          { label: item.title, href: `/cases/${item.slug}` },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <Markdown>{item.body}</Markdown>
            <Link
              href="/cases"
              className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              返回案例列表
            </Link>
          </article>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card lg:sticky lg:top-24">
              <dl className="space-y-4">
                {meta.map((m) => (
                  <div key={m.label} className="flex justify-between gap-4 border-b border-ink-100 pb-4 text-sm">
                    <dt className="text-ink-400">{m.label}</dt>
                    <dd className="text-right font-medium text-ink-800">{m.value}</dd>
                  </div>
                ))}
              </dl>

              {item.results.length > 0 && (
                <>
                  <h2 className="mt-6 text-sm font-semibold text-ink-900">项目成果</h2>
                  <ul className="mt-3 space-y-2.5">
                    {item.results.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-ink-600">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {relatedProducts.length > 0 && (
                <>
                  <h2 className="mt-6 text-sm font-semibold text-ink-900">相关产品</h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {relatedProducts.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/products/${p.slug}`}
                          className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 hover:bg-brand-100"
                        >
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </aside>
        </Container>
      </section>

      <CTA content={home.cta} />
    </>
  );
}
