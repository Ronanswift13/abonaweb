import Link from "next/link";

import type { NewsMeta } from "@/types";

/** 新闻条目（整条即链接） */
export function NewsCard({
  item,
  headingLevel = "h3",
  showSummary = false,
}: {
  item: NewsMeta;
  /** 列表页直接位于 h1 之下时传 "h2"，保持标题层级连续 */
  headingLevel?: "h2" | "h3";
  /** 列表页显示摘要，首页索引不显示 */
  showSummary?: boolean;
}) {
  const Heading = headingLevel;

  return (
    <Link href={`/news/${item.slug}`} className="group flex gap-6 py-3">
      <time dateTime={item.date} className="w-24 shrink-0 whitespace-nowrap text-[15px] leading-relaxed">
        {item.date}
      </time>
      <div className="min-w-0 flex-1">
        <Heading className="font-bold leading-snug group-hover:text-red">{item.title}</Heading>
        {showSummary && <p className="mt-2 max-w-[38em]">{item.summary}</p>}
      </div>
    </Link>
  );
}
