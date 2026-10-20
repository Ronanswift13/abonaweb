import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Icon } from "@/components/ui/Icon";
import { getAccent } from "@/lib/accent";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

/** 核心产品卡片：图标 / 角标 / 标题 / 简述 / 关键词 / 了解更多 */
export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const accent = getAccent(product.accent);
  const href = `/products/${product.slug}`;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover sm:p-8",
        className,
      )}
    >
      {/* 顶部渐变线 + 光晕 */}
      <span
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-gradient transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />
      <span
        className={cn("absolute -right-16 -top-16 size-48 rounded-full blur-3xl transition-opacity", accent.glow)}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span
          className={cn(
            "flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-glow",
            accent.icon,
          )}
        >
          <Icon name={product.icon} className="size-7" />
        </span>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{product.tag}</span>
      </div>

      <h3 className="relative mt-7 text-xl font-bold text-ink-900">
        <Link href={href} className="after:absolute after:inset-0 after:content-['']">
          {product.name}
        </Link>
      </h3>
      {product.nameEn && <p className="relative mt-1 text-sm font-medium text-ink-400">{product.nameEn}</p>}

      <p className="relative mt-4 flex-1 text-[15px] leading-relaxed text-ink-500">{product.summary}</p>

      <ul className="relative mt-6 flex flex-wrap gap-2">
        {product.keywords.map((keyword) => (
          <li key={keyword} className="rounded-md bg-ink-50 px-2.5 py-1 text-xs text-ink-600">
            {keyword}
          </li>
        ))}
      </ul>

      <span className="relative mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
        了解更多
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </article>
  );
}
