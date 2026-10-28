import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { getAccent } from "@/lib/accent";
import { cn, formatDate } from "@/lib/utils";
import type { CaseMeta } from "@/types";

/**
 * 项目案例卡片：渐变封面（暂无图片时）+ 行业 / 标题 / 摘要
 * 整张卡片即链接；悬停上浮只作用于内层，链接点击区域保持不动。
 */
export function CaseCard({
  item,
  headingLevel = "h3",
  className,
}: {
  item: CaseMeta;
  /** 列表页直接位于 h1 之下时传 "h2"，保持标题层级连续 */
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const Heading = headingLevel;
  const accent = getAccent(item.accent);
  const titleId = `case-card-${item.slug}`;

  return (
    <Link
      href={`/cases/${item.slug}`}
      aria-labelledby={titleId}
      className={cn(
        "group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-4",
        className,
      )}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-card-hover">
        {/* 封面：后续可替换为项目图片（next/image） */}
        <div className={cn("relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br", accent.icon)}>
          <div className="absolute inset-0 bg-grid-dark bg-grid opacity-60" aria-hidden="true" />
          <Icon name={item.icon} className="relative size-14 text-white/90 transition-transform duration-500 group-hover:scale-110" />
          <span className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {item.industry}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs text-ink-400">
            {item.client} · {formatDate(item.date)}
          </p>
          <Heading id={titleId} className="mt-2 text-lg font-bold leading-snug text-ink-900 transition-colors group-hover:text-brand-800">
            {item.title}
          </Heading>
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-500">{item.summary}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
            查看案例
            <LinkArrow />
          </span>
        </div>
      </article>
    </Link>
  );
}
