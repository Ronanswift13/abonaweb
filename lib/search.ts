import { businessDirections } from "@/data/business";
import { capabilities } from "@/data/capabilities";
import { directions } from "@/data/directions";
import { getAllCases, getAllNews, getAllProducts } from "@/lib/content";
import type { SearchEntry } from "@/types";

/**
 * 构建站内搜索索引（构建期生成，随 /search 页面下发）
 * V1.0 内容量小，客户端直接过滤即可；内容增多后可替换为服务端搜索或第三方搜索服务。
 */
export function buildSearchIndex(): SearchEntry[] {
  return [
    ...getAllProducts().map((p) => ({
      type: "产品",
      title: p.name,
      description: p.summary,
      href: `/products/${p.slug}`,
    })),
    ...capabilities.map((c) => ({
      type: "核心能力",
      title: c.title,
      description: c.summary,
      href: `/capabilities#${c.id}`,
    })),
    ...businessDirections.map((b) => ({
      type: "业务方向",
      title: b.title,
      description: b.description,
      href: b.href,
    })),
    ...getAllCases().map((c) => ({
      type: "项目案例",
      title: c.title,
      description: c.summary,
      href: `/cases/${c.slug}`,
    })),
    ...getAllNews().map((n) => ({
      type: "新闻动态",
      title: n.title,
      description: n.summary,
      href: `/news/${n.slug}`,
    })),
    ...directions.map((d) => ({
      type: "发展方向",
      title: d.title,
      description: d.summary,
      href: `/directions#${d.id}`,
    })),
  ];
}
