"use client";

import { useEffect, useRef } from "react";

import type { ProductVideo } from "@/types";

/**
 * 无声循环演示视频（替代 GIF：体积更小、画质更好）
 * - 进入视口才播放、离开即暂停，避免后台占用带宽
 * - 系统开启“减少动态效果”时不自动播放，改为显示播放控件由用户手动播放
 */
export function LoopVideo({ video, label, className }: { video: ProductVideo; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    const sync = () => {
      el.controls = reduced.matches;
      if (visible && !reduced.matches) el.play().catch(() => {});
      else if (!reduced.matches) el.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    reduced.addEventListener("change", sync);
    sync();
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="metadata"
      poster={video.poster}
      aria-label={label}
    >
      <source src={video.src} type="video/mp4" />
    </video>
  );
}
