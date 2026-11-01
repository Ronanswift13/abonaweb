import Image from "next/image";
import Link from "next/link";

import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Logo + 公司名，点击返回首页。
 * 导航里两版都渲染，切换规则在 globals.css；页脚固定是深色底，传 invert 只用反白版。
 */
export function Logo({ invert = false, className }: { invert?: boolean; className?: string }) {
  const size = { width: site.logo.width, height: site.logo.height };
  return (
    // 可访问名称取自可见文字（满足“标签与可见文字一致”），不再单独设置 aria-label
    <Link href="/" className={cn("inline-flex shrink-0 items-center gap-3", className)}>
      <Image src="/images/brand/logo-light.png" alt="" {...size} priority className="logo-on-dark h-9 w-auto" />
      {!invert && <Image src={site.logo.src} alt="" {...size} priority className="logo-on-light h-9 w-auto" />}
      {/* 小屏（< 640px）显示简称，避免导航栏溢出 */}
      <span className="text-[15px] font-bold">
        <span className="sm:hidden">{site.shortName}</span>
        <span className="hidden sm:inline">{site.name}</span>
      </span>
    </Link>
  );
}
