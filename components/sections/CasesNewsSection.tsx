import { CaseCard } from "@/components/cards/CaseCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CaseMeta, HomeContent, NewsMeta } from "@/types";

interface CasesNewsSectionProps {
  content: HomeContent["casesNews"];
  cases: CaseMeta[];
  news: NewsMeta[];
}

/** 首页：项目案例（左）+ 新闻动态（右） */
export function CasesNewsSection({ content, cases, news }: CasesNewsSectionProps) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <SectionHeading
            {...content.cases}
            action={
              <ButtonLink href={content.cases.more.href} variant="ghost" size="sm" arrow>
                {content.cases.more.label}
              </ButtonLink>
            }
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {cases.map((item) => (
              <CaseCard key={item.slug} item={item} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <SectionHeading
            {...content.news}
            action={
              <ButtonLink href={content.news.more.href} variant="ghost" size="sm" arrow>
                {content.news.more.label}
              </ButtonLink>
            }
          />
          <div className="mt-10 divide-y divide-ink-100 border-y border-ink-100">
            {news.map((item) => (
              <NewsCard key={item.slug} item={item} compact />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
