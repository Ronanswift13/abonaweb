import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { BusinessDirection } from "@/types";

/** 业务方向条目 */
export function BusinessCard({ item }: { item: BusinessDirection }) {
  return (
    <Link
      href={item.href}
      className="group block h-full border-t border-ink-200 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
    >
      <h3 className="flex items-center gap-1 font-bold text-ink-900 transition-colors group-hover:text-brand-700">
        {item.title}
        <ChevronRight className="size-4 text-ink-300 transition-colors group-hover:text-brand-700" aria-hidden="true" />
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.description}</p>
    </Link>
  );
}
