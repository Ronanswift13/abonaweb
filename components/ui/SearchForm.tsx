import Form from "next/form";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

interface SearchFormProps {
  defaultValue?: string;
  autoFocus?: boolean;
  className?: string;
  onSubmit?: () => void;
}

/** 站内搜索表单：提交到 /search?q=xxx（无 JS 时同样可用） */
export function SearchForm({ defaultValue, autoFocus, className, onSubmit }: SearchFormProps) {
  return (
    <Form action="/search" role="search" className={cn("relative", className)} onSubmit={onSubmit}>
      <label htmlFor="site-search" className="sr-only">
        站内搜索
      </label>
      <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-400" aria-hidden="true" />
      <input
        id="site-search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        placeholder="搜索产品、案例、新闻…"
        className="h-12 w-full rounded-full border border-ink-200 bg-white pl-12 pr-24 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 h-9 -translate-y-1/2 rounded-full bg-brand-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
      >
        搜索
      </button>
    </Form>
  );
}
