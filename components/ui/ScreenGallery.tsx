"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";

/**
 * 大屏界面截图展示（产品详情页 #screens）
 * - 上方为当前截图（带窗口外框），点击可在新标签页查看原图
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
          <div className="overflow-hidden rounded-2xl bg-ink-900 shadow-card-hover ring-1 ring-ink-900/10">
            <div className="flex items-center gap-2 border-b border-white/10 bg-ink-800 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-white/20" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-white/20" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-white/20" aria-hidden="true" />
              <span className="ml-3 truncate text-xs text-ink-300">{item.title}</span>
              <a
                href={item.src}
                target="_blank"
                rel="noopener"
                className="ml-auto inline-flex items-center gap-1 text-xs text-ink-300 transition-colors hover:text-white"
              >
                <Maximize2 className="size-3.5" aria-hidden="true" />
                查看原图
              </a>
            </div>
            <Image
              src={item.src}
              width={item.width}
              height={item.height}
              alt={item.alt}
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="h-auto w-full"
            />
          </div>
          {item.caption && (
            <figcaption className="mt-4 text-sm leading-relaxed text-ink-500">
              <span className="font-semibold text-ink-800">{item.title}：</span>
              {item.caption}
            </figcaption>
          )}
        </figure>
      ))}

      <div role="tablist" aria-label={label} className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
              "group overflow-hidden rounded-xl border bg-white text-left transition-all",
              index === active
                ? "border-brand-400 shadow-card-hover ring-2 ring-brand-200"
                : "border-ink-100 shadow-card hover:border-brand-200",
            )}
          >
            <Image
              src={item.src}
              width={item.width}
              height={item.height}
              alt=""
              sizes="(min-width: 640px) 300px, 50vw"
              className={cn("aspect-video w-full object-cover", index !== active && "opacity-75 group-hover:opacity-100")}
            />
            <span className="flex items-center gap-2 px-3 py-2.5 text-sm">
              <span className={cn("truncate font-medium", index === active ? "text-ink-900" : "text-ink-600")}>
                {item.title}
              </span>
            </span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        当前显示：{current.title}
      </p>
    </div>
  );
}
