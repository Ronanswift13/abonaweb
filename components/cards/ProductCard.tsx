import Image from "next/image";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/LinkArrow";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

/**
 * 核心产品卡片：真实界面截图（无截图时为文字封面）/ 角标 / 标题 / 简述 / 进展 / 了解更多
 * 整张卡片即链接（点击任意位置进入详情页）；悬停上浮只作用于内层，链接点击区域保持不动。
 */
export function ProductCard({
  product,
  headingLevel = "h3",
  className,
}: {
  product: Product;
  /** 列表页直接位于 h1 之下时传 "h2"，保持标题层级连续 */
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const Heading = headingLevel;
  const titleId = `product-card-${product.slug}`;
  const cover = product.screens?.items[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      aria-labelledby={titleId}
      className={cn(
        "group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-4",
        className,
      )}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-[transform,box-shadow,border-color] duration-300 group-hover:-translate-y-1 group-hover:border-brand-200 group-hover:shadow-card-hover">
        {cover ? (
          <Image
            src={cover.src}
            width={cover.width}
            height={cover.height}
            alt=""
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
            className="aspect-[16/9] w-full border-b border-ink-100 object-cover object-top"
          />
        ) : (
          <div className="flex aspect-[16/9] flex-col justify-end border-b border-ink-100 bg-ink-50 p-6">
            <p className="text-3xl font-bold tracking-tight text-ink-300">{product.nameEn ?? product.name}</p>
            <p className="mt-1 text-xs text-ink-400">暂无公开界面截图</p>
          </div>
        )}

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <p className="text-xs font-semibold text-brand-700">{product.tag}</p>
          <Heading
            id={titleId}
            className="mt-2 text-xl font-bold text-ink-900 transition-colors group-hover:text-brand-800"
          >
            {product.name}
          </Heading>

          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-500">{product.summary}</p>

          <p className="mt-5 border-t border-ink-100 pt-4 text-sm leading-relaxed text-ink-600">
            <span className="font-semibold text-ink-800">进展：</span>
            {product.status}
          </p>

          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
            了解更多
            <LinkArrow />
          </span>
        </div>
      </article>
    </Link>
  );
}
