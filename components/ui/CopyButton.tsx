"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

/** 一键复制（用于微信号等）；非 HTTPS 环境下回退到 execCommand */
export function CopyButton({ value, label = "复制", className }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const input = document.createElement("textarea");
      input.value = value;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
        copied
          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
          : "border-ink-200 text-ink-500 hover:border-brand-300 hover:text-brand-700",
        className,
      )}
      aria-label={`${label}：${value}`}
    >
      {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "已复制" : label}</span>
    </button>
  );
}
