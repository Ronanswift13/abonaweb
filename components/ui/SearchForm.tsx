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
      <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink" aria-hidden="true" />
      <input
        id="site-search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        placeholder="搜索产品、案例、新闻"
        className="h-12 w-full border-[1.5px] border-ink bg-paper pl-12 pr-24 text-[15px] text-ink placeholder:text-ink/60"
      />
      <button
        type="submit"
        className="absolute right-1 top-1 h-10 bg-red px-5 text-[15px] font-bold text-paper transition-colors hover:bg-red-deep"
      >
        搜索
      </button>
    </Form>
  );
}
