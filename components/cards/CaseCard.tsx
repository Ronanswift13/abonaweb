import Image from "next/image";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/LinkArrow";
import { cn, formatDate } from "@/lib/utils";
import type { CaseMeta } from "@/types";

/**
 * 项目案例卡片：封面（有 cover 时为实拍/界面图，否则为行业 + 客户文字封面）+ 标题 / 摘要
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
  const titleId = `case-card-${item.slug}`;

  return (
    <Link
      href={`/cases/${item.slug}`}
      aria-labelledby={titleId}
      className={cn(
        "group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-4",
        className,
      )}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-[box-shadow] duration-200 group-hover:shadow-card-hover">
        <div className="relative h-40 overflow-hidden border-b border-ink-100 bg-ink-50">
          {item.cover ? (
            <>
              <Image
                src={item.cover}
                fill
                alt=""
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                className="object-cover object-top"
              />
              <span className="absolute left-4 top-4 rounded bg-white/90 px-2 py-0.5 text-xs font-medium text-ink-700">
                {item.industry}
              </span>
            </>
          ) : (
            <div className="flex h-full flex-col justify-end p-5">
              <p className="text-2xl font-bold text-ink-300">{item.industry}</p>
              <p className="mt-1 text-xs text-ink-400">{item.client}</p>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs text-ink-400">
            {item.client} · {formatDate(item.date)}
          </p>
          <Heading
            id={titleId}
            className="mt-2 text-lg font-bold leading-snug text-ink-900 transition-colors group-hover:text-brand-800"
          >
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
