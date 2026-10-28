"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types";

export interface SectionNavItem {
  id: string;
  label: string;
  icon: IconName;
}

/**
 * 吸顶页内导航（产品详情页、发展计划详情页）
 * - 紧贴主导航下方，长页面任意位置都能一键跳转
 * - 滚动时高亮当前阅读的区块，并把高亮项滚到可见范围（小屏横向滑动）
 * - 锚点跳转的避让高度见 globals.css 中 html:has([data-section-nav])
 */
export function SectionNav({ items }: { items: SectionNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);
  const ids = items.map((item) => item.id).join(",");

  // 视口上部（导航下方到屏幕中线之间）出现的第一个区块即当前区块
  useEffect(() => {
    const order = ids.split(",");
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = order.find((id) => visible.has(id));
        if (current) setActive(current);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    for (const id of order) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  // 高亮项滚到导航条中部（只滚导航条本身，不影响页面）
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !el) return;
    list.scrollTo({ left: el.offsetLeft - list.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="页内导航"
      data-section-nav
      className="sticky top-[72px] z-40 border-b border-ink-100 bg-white/90 backdrop-blur-xl"
    >
      <Container>
        <ul
          ref={listRef}
          className="relative -mx-4 flex gap-1 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => {
            const current = item.id === active;
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  data-id={item.id}
                  aria-current={current ? "location" : undefined}
                  onClick={() => setActive(item.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                    current ? "bg-brand-700 font-medium text-white" : "text-ink-600 hover:bg-ink-50 hover:text-brand-700",
                  )}
                >
                  <Icon name={item.icon} className={cn("size-4", current ? "text-white" : "text-brand-600")} />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
