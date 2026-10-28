"use client";

import { useLinkStatus } from "next/link";
import { ArrowRight, LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * 卡片“了解更多”等行动提示的箭头；必须放在 next/link 的 <Link> 内部。
 * 点击后目标页尚未就绪时换成加载图标，让访客知道点击已生效，避免重复点击。
 */
export function LinkArrow({ className }: { className?: string }) {
  const { pending } = useLinkStatus();
  return pending ? (
    <LoaderCircle className={cn("size-4 animate-spin", className)} aria-hidden="true" />
  ) : (
    <ArrowRight className={cn("size-4 transition-transform group-hover:translate-x-1", className)} aria-hidden="true" />
  );
}
