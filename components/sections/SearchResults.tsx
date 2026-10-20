"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { SearchForm } from "@/components/ui/SearchForm";
import type { SearchEntry } from "@/types";

/** 客户端过滤搜索结果（关键词按空格拆分，需全部命中标题或描述） */
export function SearchResults({ index }: { index: SearchEntry[] }) {
  const query = (useSearchParams().get("q") ?? "").trim();
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  const results =
    terms.length === 0
      ? []
      : index.filter((entry) => {
          const haystack = `${entry.title} ${entry.description} ${entry.type}`.toLowerCase();
          return terms.every((t) => haystack.includes(t));
        });

  return (
    <div>
      {/* key 保证切换关键词后输入框同步 */}
      <SearchForm key={query} defaultValue={query} />

      <div className="mt-10">
        {terms.length === 0 ? (
          <p className="text-center text-ink-400">请输入关键词，例如“大模型”“变电站”“智能体”。</p>
        ) : results.length === 0 ? (
          <p className="text-center text-ink-400">未找到与“{query}”相关的内容，换个关键词试试。</p>
        ) : (
          <>
            <p className="text-sm text-ink-500">
              找到 <span className="font-semibold text-brand-700">{results.length}</span> 条与“{query}”相关的结果
            </p>
            <ul className="mt-6 space-y-3">
              {results.map((entry) => (
                <li key={`${entry.type}-${entry.href}`}>
                  <Link
                    href={entry.href}
                    className="group flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-colors hover:border-brand-200"
                  >
                    <span className="mt-0.5 shrink-0 rounded-md bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                      {entry.type}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-ink-900 group-hover:text-brand-700">{entry.title}</span>
                      <span className="mt-1 line-clamp-2 block text-sm text-ink-500">{entry.description}</span>
                    </span>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-ink-300 group-hover:text-brand-600" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
