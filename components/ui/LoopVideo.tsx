"use client";

import { useEffect, useRef } from "react";

import type { ProductVideo } from "@/types";

/**
 * 无声循环视频（规格见 DESIGN.md 第 6 节）
 * - 接近视口才加载，进入视口才播放，离开就暂停
 * - 同一个观察器先加载再播放，避免播放先于加载触发
 * - 系统开启“减少动态效果”时不自动播放，改为显示播放控件由用户手动播放
 */
export function LoopVideo({ video, label, className }: { video: ProductVideo; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !el.getAttribute("src")) {
          el.src = video.src;
          el.load();
        }
        el.controls = reduced.matches;
        if (reduced.matches) return;
        if (entry.intersectionRatio >= 0.2) el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: "300px 0px", threshold: [0, 0.2] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [video.src]);

  return <video ref={ref} className={className} muted loop playsInline preload="none" poster={video.poster} aria-label={label} />;
}
