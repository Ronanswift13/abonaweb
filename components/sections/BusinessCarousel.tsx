"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { BusinessCard } from "@/components/cards/BusinessCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { BusinessDirection, SectionIntro } from "@/types";

interface BusinessCarouselProps {
  intro: SectionIntro;
  items: BusinessDirection[];
  /** 自动轮播间隔（毫秒） */
  autoplayDelay?: number;
}

/**
 * 业务方向滑动卡片（Embla Carousel）
 * - 每屏卡片数：移动端 1 / 平板 2 / 小桌面 3 / 桌面 4（见 slide 的 basis 类）
 * - 支持左右按钮、指示点、鼠标拖动、触摸滑动、键盘方向键
 * - 自动轮播，鼠标悬停或键盘聚焦时暂停；系统开启“减少动态效果”时不自动轮播
 * - 触屏设备不自动轮播：Embla 会吞掉滑动过程中按下的点击，自动翻页时点卡片容易“点不进去”
 */
export function BusinessCarousel({ intro, items, autoplayDelay = 4500 }: BusinessCarouselProps) {
  const [plugins] = useState(() => [
    Autoplay({
      delay: autoplayDelay,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
      active: !(
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches
      ),
    }),
  ]);
  const [viewportRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, plugins);

  // 订阅 Embla 事件，读取当前页与总页数
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!emblaApi) return () => {};
      emblaApi.on("select", onChange).on("reInit", onChange);
      return () => {
        emblaApi.off("select", onChange).off("reInit", onChange);
      };
    },
    [emblaApi],
  );
  const selected = useSyncExternalStore(subscribe, () => emblaApi?.selectedScrollSnap() ?? 0, () => 0);
  const snapCount = useSyncExternalStore(
    subscribe,
    () => emblaApi?.scrollSnapList().length ?? items.length,
    () => items.length,
  );

  // 手动切换后重新计时，避免刚点完就自动翻页
  const go = useCallback(
    (action: "prev" | "next" | number) => {
      if (!emblaApi) return;
      if (action === "prev") emblaApi.scrollPrev();
      else if (action === "next") emblaApi.scrollNext();
      else emblaApi.scrollTo(action);
      emblaApi.plugins().autoplay?.reset();
    },
    [emblaApi],
  );

  const arrowClass =
    "flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-brand-300 hover:bg-white/10 disabled:opacity-40";

  return (
    <section className="bg-night py-20 sm:py-24" aria-roledescription="carousel" aria-label={intro.title}>
      <Container>
        <SectionHeading
          {...intro}
          invert
          action={
            <div className="hidden gap-3 md:flex">
              <button type="button" className={arrowClass} onClick={() => go("prev")} aria-label="上一张">
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button type="button" className={arrowClass} onClick={() => go("next")} aria-label="下一张">
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          }
        />

        <div
          ref={viewportRef}
          className="mt-12 overflow-hidden"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") go("prev");
            if (e.key === "ArrowRight") go("next");
          }}
        >
          <div className="-ml-5 flex touch-pan-y touch-pinch-zoom">
            {items.map((item, index) => (
              <div
                key={item.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} / ${items.length}：${item.title}`}
                className="min-w-0 shrink-0 grow-0 basis-full pl-5 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <BusinessCard item={item} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* 指示点 + 移动端按钮 */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button type="button" className={cn(arrowClass, "size-9 md:hidden")} onClick={() => go("prev")} aria-label="上一张">
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <div className="flex items-center">
            {Array.from({ length: snapCount }, (_, index) => (
              // 按钮本身保持 24px 点击区域（无障碍触控尺寸），内部小圆点负责视觉
              <button
                key={index}
                type="button"
                onClick={() => go(index)}
                aria-label={`切换到第 ${index + 1} 张`}
                aria-current={index === selected}
                className="group flex h-6 min-w-6 items-center justify-center px-1"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-2 rounded-full transition-all duration-300",
                    index === selected ? "w-8 bg-brand-700" : "w-2 bg-white/25 group-hover:bg-white/50",
                  )}
                />
              </button>
            ))}
          </div>
          <button type="button" className={cn(arrowClass, "size-9 md:hidden")} onClick={() => go("next")} aria-label="下一张">
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </section>
  );
}
