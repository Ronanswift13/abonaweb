"use client";

import { Children, useState } from "react";

import { cn } from "@/lib/utils";

interface FilterTabsProps {
  /** 与 children 按顺序一一对应的分类（如新闻 category、案例 industry） */
  categories: string[];
  /** 筛选按钮组的无障碍名称，如“按分类筛选新闻” */
  label: string;
  allLabel?: string;
  /** 列表容器的类名（网格 / 间距） */
  className?: string;
  children: React.ReactNode;
}

/**
 * 分类筛选：卡片仍由服务端渲染，客户端只负责按分类显示 / 隐藏。
 * 只有一个分类时不显示筛选按钮。
 */
export function FilterTabs({ categories, label, allLabel = "全部", className, children }: FilterTabsProps) {
  const [active, setActive] = useState<string | null>(null);
  const items = Children.toArray(children);
  const options = [...new Set(categories)];
  const visible = items.filter((_, index) => active === null || categories[index] === active);

  return (
    <>
      {options.length > 1 && (
        <div role="group" aria-label={label} className="mb-8 flex flex-wrap gap-2">
          {[null, ...options].map((option) => {
            const selected = active === option;
            const count = option === null ? items.length : categories.filter((c) => c === option).length;
            return (
              <button
                key={option ?? "__all"}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(option)}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
                  selected
                    ? "border-brand-700 bg-brand-700 text-white"
                    : "border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700",
                )}
              >
                {option ?? allLabel}
                <span className={cn("text-xs tabular-nums", selected ? "text-white/80" : "text-ink-400")}>{count}</span>
              </button>
            );
          })}
        </div>
      )}
      <div className={className}>{visible}</div>
    </>
  );
}
