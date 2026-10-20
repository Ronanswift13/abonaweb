"use client";

import { useSyncExternalStore } from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

/** 页面滚动超过一屏后出现的“返回顶部”按钮 */
export function BackToTop() {
  const visible = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > 640,
    () => false,
  );

  return (
    <button
      type="button"
      aria-label="返回顶部"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 right-4 z-40 flex size-11 items-center justify-center rounded-full border border-ink-100 bg-white/90 text-ink-700 shadow-card backdrop-blur transition-all duration-300 hover:border-brand-200 hover:text-brand-700 sm:right-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}
