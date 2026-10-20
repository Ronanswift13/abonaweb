import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Markdown } from "@/components/ui/Markdown";
import { site } from "@/data/site";
import { getAllNews, getNews } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { formatDate, toJsonLd } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNews().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getNews(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.summary,
    path: `/news/${slug}`,
    type: "article",
    publishedTime: article.date,
  });
}

export default async function NewsDetailPage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const article = getNews(slug);
  if (!article) notFound();

  // 列表按时间倒序：前一项为“较新”，后一项为“较早”
  const all = getAllNews();
  const index = all.findIndex((n) => n.slug === slug);
  const newer = all[index - 1];
  const older = all[index + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    publisher: { "@type": "Organization", name: site.name, logo: `${site.url}${site.logo.src}` },
  };

  return (
    <>
      <PageHeader
        eyebrow={article.category}
        title={article.title}
        breadcrumbs={[
          { label: "新闻动态", href: "/news" },
          { label: article.title, href: `/news/${article.slug}` },
        ]}
      >
        <p className="mt-5 text-sm text-ink-400">
          <time dateTime={article.date}>{formatDate(article.date)}</time> · {site.name}
        </p>
      </PageHeader>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <article>
            <Markdown>{article.body}</Markdown>
          </article>

          <nav aria-label="上一篇与下一篇" className="mt-16 grid gap-4 border-t border-ink-100 pt-8 sm:grid-cols-2">
            {older ? (
              <Link href={`/news/${older.slug}`} className="group rounded-2xl border border-ink-100 p-5 hover:border-brand-200">
                <span className="flex items-center gap-1 text-xs text-ink-400">
                  <ArrowLeft className="size-3.5" aria-hidden="true" />
                  上一篇
                </span>
                <span className="mt-2 block font-semibold text-ink-800 group-hover:text-brand-700">{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link
                href={`/news/${newer.slug}`}
                className="group rounded-2xl border border-ink-100 p-5 text-right hover:border-brand-200"
              >
                <span className="flex items-center justify-end gap-1 text-xs text-ink-400">
                  下一篇
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
                <span className="mt-2 block font-semibold text-ink-800 group-hover:text-brand-700">{newer.title}</span>
              </Link>
            )}
          </nav>
        </Container>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />
    </>
  );
}
