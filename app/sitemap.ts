import type { MetadataRoute } from "next";

import { site } from "@/data/site";
import { getAllCases, getAllNews, getAllProducts } from "@/lib/content";

/** 自动生成 /sitemap.xml：静态栏目 + 产品 / 案例 / 新闻详情 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/capabilities", "/products", "/cases", "/directions", "/news", "/about", "/contact"].map(
    (path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  return [
    ...staticRoutes,
    ...getAllProducts().map((p) => ({ url: `${site.url}/products/${p.slug}`, priority: 0.7 })),
    ...getAllCases().map((c) => ({ url: `${site.url}/cases/${c.slug}`, lastModified: c.date, priority: 0.6 })),
    ...getAllNews().map((n) => ({ url: `${site.url}/news/${n.slug}`, lastModified: n.date, priority: 0.6 })),
  ];
}
