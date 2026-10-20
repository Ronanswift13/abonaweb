import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn, formatDate } from "@/lib/utils";
import type { NewsMeta } from "@/types";

/** 新闻条目：compact 用于首页列表，默认用于新闻列表页 */
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
  return (
    <article
      className={cn(
        "group relative flex gap-5 rounded-2xl transition-colors",
        compact ? "py-5" : "border border-ink-100 bg-white p-6 shadow-card hover:border-brand-200 sm:p-7",
        className,
      )}
    >
      {/* 日期块 */}
      <time
        dateTime={item.date}
        className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-50 py-2 text-brand-700"
      >
        <span className="text-xl font-bold leading-none">{item.date.slice(8, 10)}</span>
        <span className="mt-1 text-[11px]">{item.date.slice(0, 7)}</span>
      </time>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-brand-600">{item.category}</p>
        <Heading className="mt-1 font-bold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
          <Link href={`/news/${item.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {item.title}
          </Link>
        </Heading>
        <p className={cn("mt-2 text-sm leading-relaxed text-ink-500", compact ? "line-clamp-1" : "line-clamp-2")}>
          {item.summary}
        </p>
        {!compact && (
          <p className="mt-4 flex items-center justify-between text-xs text-ink-400">
            <span>{formatDate(item.date)}</span>
            <span className="inline-flex items-center gap-1 font-semibold text-brand-700">
              阅读全文
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </p>
        )}
      </div>
    </article>
  );
}
