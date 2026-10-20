import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import type { LinkItem } from "@/types";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** 面包屑（不含“首页”，会自动添加） */
  breadcrumbs?: LinkItem[];
  children?: React.ReactNode;
}

/** 子页面顶部横幅：面包屑 + 标题 + 描述 */
export function PageHeader({ eyebrow, title, description, breadcrumbs = [], children }: PageHeaderProps) {
  const crumbs = [{ label: "首页", href: "/" }, ...breadcrumbs];

  return (
    <section className="relative isolate overflow-hidden border-b border-ink-100 bg-white">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-light bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="absolute -right-24 -top-32 size-[480px] rounded-full bg-aqua-300/25 blur-3xl" />
        <div className="absolute -left-24 top-10 size-[360px] rounded-full bg-brand-200/30 blur-3xl" />
      </div>

      <Container className="py-14 sm:py-20">
        <nav aria-label="面包屑">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-400">
            {crumbs.map((crumb, index) => {
              const last = index === crumbs.length - 1;
              return (
                <li key={crumb.href} className="flex items-center gap-1">
                  {last ? (
                    <span aria-current="page" className="text-ink-600">
                      {crumb.label}
                    </span>
                  ) : (
                    <>
                      <Link href={crumb.href} className="hover:text-brand-700">
                        {crumb.label}
                      </Link>
                      <ChevronRight className="size-3.5" aria-hidden="true" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {eyebrow && (
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
          {title}
        </h1>
        {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg">{description}</p>}
        {children}
      </Container>
    </section>
  );
}
