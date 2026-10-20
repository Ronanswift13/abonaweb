import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn, isExternalHref } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  // 品牌渐变主按钮
  primary:
    "bg-brand-button text-white shadow-glow hover:brightness-110 hover:shadow-[0_16px_40px_-12px_rgba(0,174,239,0.75)]",
  // 白底描边按钮
  secondary: "border border-ink-200 bg-white text-ink-800 hover:border-brand-300 hover:text-brand-700",
  ghost: "text-brand-700 hover:bg-brand-50",
  // 深色/渐变背景上的白色按钮
  light: "bg-white text-brand-800 shadow-card hover:bg-brand-50",
  "outline-light": "border border-white/40 text-white hover:border-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  /** 是否显示右箭头 */
  arrow?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

/** 链接样式按钮：站内链接使用 next/link，tel:/mailto:/http 使用原生 <a> */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  icon,
  className,
}: ButtonLinkProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-300",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      {icon}
      {children}
      {arrow && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
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
