import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { BusinessDirection } from "@/types";

/** 业务方向卡片（用于首页滑动轮播）；悬停上浮只作用于内层，链接点击区域保持不动 */
export function BusinessCard({ item, index }: { item: BusinessDirection; index: number }) {
  return (
    <Link
      href={item.href}
      draggable={false}
      className="group block h-full select-none rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200 focus-visible:ring-offset-2 focus-visible:ring-offset-night"
    >
      <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-6 transition-[transform,background-color,border-color] duration-300 group-hover:-translate-y-1 group-hover:border-white/25 group-hover:bg-white/[0.08]">
        <div className="flex items-center justify-between text-sm">
          <span className="font-mono text-white/40">{String(index + 1).padStart(2, "0")}</span>
          <ArrowUpRight
            className="size-5 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
            aria-hidden="true"
          />
        </div>

        <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-300">{item.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <li key={tag} className="rounded border border-white/15 px-2 py-0.5 text-xs text-ink-200">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
