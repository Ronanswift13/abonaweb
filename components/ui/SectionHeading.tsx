import { cn } from "@/lib/utils";
import type { SectionIntro } from "@/types";

interface SectionHeadingProps extends SectionIntro {
  /** 标题右侧附加内容（如“全部案例”链接） */
  action?: React.ReactNode;
  className?: string;
}

/** 区块标题：一律左对齐，标题 + 描述 */
export function SectionHeading({ title, description, action, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-3xl">
        <h2 className="text-[2.25rem] leading-[1.15] text-theme-heading sm:text-5xl lg:text-[3.25rem]">
          {title}
        </h2>
        {description && <p className="mt-4 max-w-[38em]">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
