import { Suspense } from "react";

import { PageHeader } from "@/components/sections/PageHeader";
import { SearchResults } from "@/components/sections/SearchResults";
import { SearchForm } from "@/components/ui/SearchForm";
import { Container } from "@/components/ui/Container";
import { buildSearchIndex } from "@/lib/search";
import { pageMetadata } from "@/lib/metadata";

export const metadata = {
  ...pageMetadata({ title: "站内搜索", description: "搜索艾博纳的产品、案例与新闻。", path: "/search" }),
  robots: { index: false },
};

/** 搜索页：索引在构建期生成，关键词（?q=）在浏览器端过滤，页面保持静态 */
export default function SearchPage() {
  return (
    <>
      <PageHeader title="站内搜索" breadcrumbs={[{ label: "站内搜索", href: "/search" }]} />
      <section className="py-16">
        <Container className="max-w-3xl">
          <Suspense fallback={<SearchForm />}>
            <SearchResults index={buildSearchIndex()} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
