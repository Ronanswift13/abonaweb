import { cn } from "@/lib/utils";
import type { SectionIntro } from "@/types";

interface SectionHeadingProps extends SectionIntro {
  align?: "left" | "center";
  /** 深色背景上使用 */
  invert?: boolean;
  /** 标题右侧附加内容（如“查看更多”链接） */
  action?: React.ReactNode;
  className?: string;
}

/** 区块标题：英文小标题 + 中文标题 + 描述 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
  action,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        <p
          className={cn(
            "mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]",
            invert ? "text-brand-200" : "text-brand-700",
          )}
        >
          <span className="h-px w-6 bg-current" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2
          className={cn(
            "text-3xl font-bold tracking-tight sm:text-4xl",
            invert ? "text-white" : "text-ink-900",
          )}
        >
          {title}
        </h2>
        {description && (
          <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", invert ? "text-ink-200" : "text-ink-500")}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
