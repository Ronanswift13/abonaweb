import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { site } from "@/data/site";
import { toJsonLd } from "@/lib/utils";
import type { LinkItem } from "@/types";

/** 面包屑（不含“首页”，会自动添加），同时输出结构化数据 */
export function Breadcrumbs({ items }: { items: LinkItem[] }) {
  const crumbs = [{ label: "首页", href: "/" }, ...items];
  const jsonLd = {
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
    <>
      <nav aria-label="面包屑">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          {crumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center gap-1">
              {index === crumbs.length - 1 ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <>
                  <Link href={crumb.href} className="underline-offset-4 hover:underline">
                    {crumb.label}
                  </Link>
                  <ChevronRight className="size-3.5" aria-hidden="true" />
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />
    </>
  );
}
