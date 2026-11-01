import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
        title={article.title}
        size="md"
        breadcrumbs={[
          { label: "新闻动态", href: "/news" },
          { label: article.title, href: `/news/${article.slug}` },
        ]}
      >
        <p className="mt-5 flex flex-wrap gap-x-5 text-[15px]">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span>{article.category}</span>
        </p>
      </PageHeader>

      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <article className="max-w-3xl">
            <Markdown>{article.body}</Markdown>
          </article>

          <nav aria-label="上一篇与下一篇" className="mt-16 grid max-w-3xl gap-4 border-t border-ink/15 pt-8 sm:grid-cols-2">
            {older ? (
              <Link href={`/news/${older.slug}`} className="group">
                <span className="flex items-center gap-1 text-sm text-ink">
                  上一篇
                </span>
                <span className="mt-2 block font-bold text-ink group-hover:text-red">{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link
                href={`/news/${newer.slug}`}
                className="group text-right"
              >
                <span className="flex items-center justify-end gap-1 text-sm text-ink">
                  下一篇
                </span>
                <span className="mt-2 block font-bold text-ink group-hover:text-red">{newer.title}</span>
              </Link>
            )}
          </nav>
        </Container>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />
    </>
  );
}
