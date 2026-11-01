import { CaseCard } from "@/components/cards/CaseCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import type { CaseMeta, HomeContent, NewsMeta } from "@/types";

interface CasesNewsSectionProps {
  content: HomeContent["casesNews"];
  cases: CaseMeta[];
  news: NewsMeta[];
}

/** 首页：项目案例 + 新闻动态，只是文字索引，不做卡片 */
export function CasesNewsSection({ content, cases, news }: CasesNewsSectionProps) {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
        <div>
          <SectionHeading {...content.cases} action={<TextLink href={content.cases.more.href}>{content.cases.more.label}</TextLink>} />
          <div className="mt-8">
            {cases.map((item) => (
              <CaseCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
        <div>
          <SectionHeading {...content.news} action={<TextLink href={content.news.more.href}>{content.news.more.label}</TextLink>} />
          <div className="mt-8">
            {news.map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
