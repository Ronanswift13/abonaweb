import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Markdown } from "@/components/ui/Markdown";
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
        title={item.title}
        description={item.summary}
        breadcrumbs={[
          { label: "项目案例", href: "/cases" },
          { label: item.title, href: `/cases/${item.slug}` },
        ]}
        size="md"
      />

      <section className="bg-paper py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <Markdown>{item.body}</Markdown>
            <Link
              href="/cases"
              className="mt-12 inline-flex items-center gap-2 text-sm font-bold text-red hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              返回案例列表
            </Link>
          </article>

          <aside className="space-y-6 lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <dl className="grid gap-3">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt className="text-sm">{m.label}</dt>
                    <dd className="font-bold">{m.value}</dd>
                  </div>
                ))}
              </dl>

              {item.results.length > 0 && (
                <>
                  <h2 className="mt-6 text-sm font-bold text-ink">项目成果</h2>
                  <ul className="mt-3 space-y-2.5">
                    {item.results.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-ink">
                        <Check className="mt-0.5 size-4 shrink-0 text-ink" aria-hidden="true" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {relatedProducts.length > 0 && (
                <>
                  <h2 className="mt-6 text-sm font-bold text-ink">相关产品</h2>
                  <ul className="mt-3 space-y-1.5">
                    {relatedProducts.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/products/${p.slug}`}
                          className="text-sm text-red underline-offset-4 hover:underline"
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

    </>
  );
}
