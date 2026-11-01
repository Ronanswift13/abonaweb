import Link from "next/link";

import { cn } from "@/lib/utils";

/** 文字链接：区块标题旁的“全部案例”等 */
export function TextLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={cn("text-[15px] font-bold underline underline-offset-4 hover:text-theme-heading", className)}>
      {children}
    </Link>
  );
}
