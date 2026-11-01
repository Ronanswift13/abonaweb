import Link from "next/link";

import { formatDate } from "@/lib/utils";
import type { CaseMeta } from "@/types";

/** 项目案例条目（整条即链接）：标题、摘要、行业和时间 */
export function CaseCard({
  item,
  headingLevel = "h3",
  showSummary = false,
}: {
  item: CaseMeta;
  /** 列表页直接位于 h1 之下时传 "h2"，保持标题层级连续 */
  headingLevel?: "h2" | "h3";
  /** 列表页显示摘要，首页索引不显示 */
  showSummary?: boolean;
}) {
  const Heading = headingLevel;

  return (
    <Link href={`/cases/${item.slug}`} className="group block py-3">
      <Heading className="text-lg font-bold leading-snug group-hover:text-theme-heading">{item.title}</Heading>
      {showSummary && <p className="mt-2 max-w-[38em]">{item.summary}</p>}
      <p className="mt-1 flex flex-wrap gap-x-5 text-sm">
        <span>{item.industry}</span>
        <span>{item.client}</span>
        <time dateTime={item.date}>{formatDate(item.date)}</time>
      </p>
    </Link>
  );
}
