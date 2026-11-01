"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";

/**
 * 大屏界面截图展示（产品详情页 #screens）
 * - 上方为当前截图，放在炭黑底色上；点击右上角可在新标签页查看原图
 * - 下方缩略图即标签页：点击或用左右方向键切换
 */
export function ScreenGallery({ items, label }: { items: ProductImage[]; label: string }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = items[active];

  const select = (index: number, focus = false) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  return (
    <div className="mt-12">
      {items.map((item, index) => (
        <figure
          key={item.src}
          id={`screen-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`screen-tab-${index}`}
          hidden={index !== active}
        >
          <div className="relative">
            <Image
              src={item.src}
              width={item.width}
              height={item.height}
              alt={item.alt}
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="h-auto w-full"
            />
            <a
              href={item.src}
              target="_blank"
              rel="noopener"
              className="absolute right-3 top-3 inline-flex items-center gap-1 bg-theme-bg px-2 py-1 text-sm text-theme-fg hover:underline"
            >
              <Maximize2 className="size-3.5" aria-hidden="true" />
              查看原图
            </a>
          </div>
          {item.caption && (
            <figcaption className="mt-5 max-w-[38em] text-[15px] leading-relaxed">
              <span className="font-bold">{item.title}：</span>
              {item.caption}
            </figcaption>
          )}
        </figure>
      ))}

      <div role="tablist" aria-label={label} className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
        {items.map((item, index) => (
          <button
            key={item.src}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            id={`screen-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`screen-panel-${index}`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") select(active + 1, true);
              if (e.key === "ArrowLeft") select(active - 1, true);
            }}
            className={cn(
              "border-b-2 py-1 text-[15px] transition-colors",
              index === active ? "border-theme-heading font-bold" : "border-transparent hover:border-theme-heading",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        当前显示：{current.title}
      </p>
    </div>
  );
}
