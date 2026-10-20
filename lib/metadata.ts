import type { Metadata } from "next";

import { site } from "@/data/site";

/**
 * 生成子页面 Metadata：独立 Title / Description / Canonical / Open Graph / Twitter 卡片
 * 用法：export const metadata = pageMetadata({ title: "核心能力", description: "...", path: "/capabilities" });
 * 新闻详情等文章页传入 type: "article" 与 publishedTime。
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
}: {
  title: string;
  description?: string;
  path: string;
  type?: "website" | "article";
  /** YYYY-MM-DD，仅 article 使用 */
  publishedTime?: string;
}): Metadata {
  const desc = description ?? site.description;
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      ...(type === "article" ? { type: "article", publishedTime } : { type: "website" }),
      locale: "zh_CN",
      siteName: site.name,
      title: fullTitle,
      description: desc,
      url: path,
      images: [site.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [site.ogImage.url],
    },
  };
}
