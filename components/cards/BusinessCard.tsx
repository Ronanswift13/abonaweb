import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Icon } from "@/components/ui/Icon";
import { getAccent } from "@/lib/accent";
import { cn } from "@/lib/utils";
import type { BusinessDirection } from "@/types";

/** 业务方向卡片（用于首页滑动轮播） */
export function BusinessCard({ item }: { item: BusinessDirection }) {
  const accent = getAccent(item.accent);

  return (
    <Link
      href={item.href}
      draggable={false}
      className="group relative flex h-full select-none flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-300/40 hover:bg-white/[0.1]"
    >
      <span
        className={cn("absolute -right-10 -top-10 size-36 rounded-full opacity-60 blur-2xl", accent.glow)}
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between">
        <span
          className={cn("flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white", accent.icon)}
        >
          <Icon name={item.icon} className="size-6" />
        </span>
        <ArrowUpRight
          className="size-5 text-ink-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-200"
          aria-hidden="true"
        />
      </div>

      <p className="relative mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-200/80">
        {item.subtitle}
      </p>
      <h3 className="relative mt-1.5 text-lg font-bold text-white">{item.title}</h3>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-300">{item.description}</p>

      <ul className="relative mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <li key={tag} className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs text-ink-200">
            {tag}
          </li>
        ))}
      </ul>
    </Link>
  );
}
