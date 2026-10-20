import { NewsCard } from "@/components/cards/NewsCard";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { getAllNews } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const title = "新闻动态";
const description = "公司新闻、项目进展、技术成果与行业观察。";

export const metadata = pageMetadata({ title, description, path: "/news" });

export default function NewsPage() {
  const news = getAllNews();

  return (
    <>
      <PageHeader eyebrow="NEWSROOM" title={title} description={description} breadcrumbs={[{ label: title, href: "/news" }]} />
      <section className="py-20">
        <Container className="max-w-4xl">
          {news.length > 0 ? (
            <div className="space-y-5">
              {news.map((item) => (
                <NewsCard key={item.slug} item={item} />
              ))}
            </div>
          ) : (
            <p className="py-20 text-center text-ink-400">暂无新闻。</p>
          )}
        </Container>
      </section>
    </>
  );
}
