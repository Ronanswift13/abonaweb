import Link from "next/link";

import { LinkArrow } from "@/components/ui/LinkArrow";
import { cn, formatDate } from "@/lib/utils";
import type { NewsMeta } from "@/types";

/** 新闻条目（整条即链接）：compact 用于首页列表，默认用于新闻列表页 */
export function NewsCard({
  item,
  compact = false,
  headingLevel = "h3",
  className,
}: {
  item: NewsMeta;
  compact?: boolean;
  /** 列表页直接位于 h1 之下时传 "h2"，保持标题层级连续 */
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const Heading = headingLevel;
  const titleId = `news-card-${item.slug}`;

  return (
    <Link
      href={`/news/${item.slug}`}
      aria-labelledby={titleId}
      className={cn(
        "group flex gap-5 rounded-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
        compact ? "py-5" : "border border-ink-100 bg-white p-6 shadow-card hover:border-brand-200 sm:p-7",
        className,
      )}
    >
      <time dateTime={item.date} className="w-24 shrink-0 whitespace-nowrap pt-0.5 text-sm text-ink-400">
        {item.date}
      </time>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-brand-600">{item.category}</p>
        <Heading id={titleId} className="mt-1 font-bold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
          {item.title}
        </Heading>
        <p className={cn("mt-2 text-sm leading-relaxed text-ink-500", compact ? "line-clamp-1" : "line-clamp-2")}>
          {item.summary}
        </p>
        {!compact && (
          <p className="mt-4 flex items-center justify-between text-xs text-ink-400">
            <span>{formatDate(item.date)}</span>
            <span className="inline-flex items-center gap-1 font-semibold text-brand-700">
              阅读全文
              <LinkArrow className="size-3.5" />
            </span>
          </p>
        )}
      </div>
    </Link>
  );
}
