import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

/** 渲染 content/ 下的 Markdown 正文（支持 GFM：表格、任务列表等） */
export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("prose prose-lg max-w-none prose-headings:font-bold prose-a:no-underline hover:prose-a:underline", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
