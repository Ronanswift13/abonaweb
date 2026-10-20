import Image from "next/image";
import Link from "next/link";

import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** 是否显示公司名称 */
  withName?: boolean;
  /** 深色背景（页脚）上使用 */
  invert?: boolean;
  className?: string;
}

/** Logo + 公司名，点击返回首页。Logo 高度 44px（设计要求 40–48px） */
export function Logo({ withName = true, invert = false, className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} - 返回首页`}
      className={cn("group inline-flex shrink-0 items-center gap-3", className)}
    >
      <Image
        src={site.logo.src}
        alt={site.logo.alt}
        width={site.logo.width}
        height={site.logo.height}
        priority
        className="h-10 w-auto transition-transform duration-300 group-hover:scale-105 sm:h-11"
      />
      {withName && (
        <span className="flex flex-col leading-tight">
          {/* 小屏（< 640px）显示简称，避免导航栏溢出 */}
          <span className={cn("text-[15px] font-bold tracking-wide", invert ? "text-white" : "text-ink-900")}>
            <span className="sm:hidden">{site.shortName}</span>
            <span className="hidden sm:inline">{site.name}</span>
          </span>
          <span
            className={cn(
              "text-[10px] font-medium uppercase tracking-[0.18em]",
              invert ? "text-ink-300" : "text-ink-400",
            )}
          >
            {site.brand}
            <span className="hidden sm:inline"> · {site.domain}</span>
          </span>
        </span>
      )}
    </Link>
  );
}
