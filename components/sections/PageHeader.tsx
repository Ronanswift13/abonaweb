import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { cn, toJsonLd } from "@/lib/utils";
import type { LinkItem } from "@/types";

interface PageHeaderProps {
  /** 标题上方的中文分类，如产品标签、新闻分类 */
  eyebrow?: string;
  title: string;
  description?: string;
  /** 面包屑（不含“首页”，会自动添加） */
  breadcrumbs?: LinkItem[];
  children?: React.ReactNode;
}

/** 子页面顶部横幅：面包屑 + 标题 + 描述（同时输出面包屑结构化数据） */
export function PageHeader({ eyebrow, title, description, breadcrumbs = [], children }: PageHeaderProps) {
  const crumbs = [{ label: "首页", href: "/" }, ...breadcrumbs];
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${site.url}${crumb.href === "/" ? "" : crumb.href}`,
    })),
  };

  return (
    <section className="border-b border-ink-100 bg-ink-50/60">
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
          <p className="mt-8 text-sm font-medium text-brand-700">{eyebrow}</p>
        )}
        <h1 className={cn("max-w-4xl text-3xl font-bold leading-tight text-ink-900 sm:text-4xl", eyebrow ? "mt-2" : "mt-8")}>
          {title}
        </h1>
        {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg">{description}</p>}
        {children}
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
    </section>
  );
}
