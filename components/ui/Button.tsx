import Link from "next/link";

import { cn, isExternalHref } from "@/lib/utils";

/**
 * primary 是公司红实心按钮，页面上红色主要出现在这里；theme 用在产品屏上，跟随这一屏的强调色；
 * onDark 用在深色底上，onLight 用在浅色底上
 */
type Variant = "primary" | "theme" | "onDark" | "onLight";

const variants: Record<Variant, string> = {
  primary: "border-red bg-red text-paper hover:border-red-deep hover:bg-red-deep",
  theme: "border-theme-accent bg-theme-accent text-theme-on-accent hover:bg-theme-fg hover:border-theme-fg hover:text-theme-bg",
  onDark: "border-paper text-paper hover:bg-paper hover:text-ink",
  onLight: "border-ink text-ink hover:bg-ink hover:text-paper",
};

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  icon?: React.ReactNode;
  className?: string;
}

/** 描边按钮：站内链接使用 next/link，tel:/mailto:/http 使用原生 <a>。文字要写清点了之后发生什么 */
export function ButtonLink({ href, children, variant = "onLight", icon, className }: ButtonLinkProps) {
  const classes = cn(
    "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap border-[1.5px] px-6 text-[15px] font-bold transition-colors duration-150 active:translate-y-px",
    variants[variant],
    className,
  );

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  if (isExternalHref(href)) {
    const isWeb = href.startsWith("http");
    return (
      <a href={href} className={classes} {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
