import { cn } from "@/lib/utils";

/** 统一页面内容宽度与左右留白 */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1680px] px-[clamp(20px,6.6vw,96px)]", className)}>{children}</div>;
}
