import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Icon } from "@/components/ui/Icon";
import { getAccent } from "@/lib/accent";
import { cn, formatDate } from "@/lib/utils";
import type { CaseMeta } from "@/types";

/** 项目案例卡片：渐变封面（暂无图片时）+ 行业 / 标题 / 摘要 */
export function CaseCard({ item, className }: { item: CaseMeta; className?: string }) {
  const accent = getAccent(item.accent);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
        className,
      )}
    >
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
        <h3 className="mt-2 text-lg font-bold leading-snug text-ink-900">
          <Link href={`/cases/${item.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {item.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-500">{item.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          查看案例
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
