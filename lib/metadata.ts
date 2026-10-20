import type { Metadata } from "next";

import { site } from "@/data/site";

/**
 * 生成子页面 Metadata：独立 Title / Description / Canonical / Open Graph
 * 用法：export const metadata = pageMetadata({ title: "核心能力", description: "...", path: "/capabilities" });
 */
export function pageMetadata({ title, description, path }: { title: string; description?: string; path: string }): Metadata {
  const desc = description ?? site.description;
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description: desc,
      url: path,
      images: [{ url: site.logo.src, width: site.logo.width, height: site.logo.height, alt: site.logo.alt }],
    },
  };
}
