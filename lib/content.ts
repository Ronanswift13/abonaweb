/**
 * 内容读取层
 * - 新闻：content/news/*.md
 * - 案例：content/cases/*.md
 * - 产品：data/products.ts
 * 文件名（去掉 .md）即 URL slug。frontmatter 缺少必填字段时会在构建期报错，提示具体文件。
 * 页面只通过这里的函数取数，后续切换到 CMS / API（V2.0）时只需改写本文件。
 */
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

import { products } from "@/data/products";
import { accentStyles } from "@/lib/accent";
import type { Accent, CaseStudy, IconName, NewsArticle, Product } from "@/types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

type Frontmatter = Record<string, unknown>;

/* ------------------------------------------------------------------ */
/* frontmatter 校验工具                                                 */
/* ------------------------------------------------------------------ */

function fail(file: string, message: string): never {
  throw new Error(`[content] ${file}: ${message}`);
}

function str(data: Frontmatter, key: string, file: string): string {
  const value = data[key];
  // YAML 中未加引号的日期会被解析成 Date，这里统一转回 YYYY-MM-DD
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value !== "string" || value.trim() === "") fail(file, `缺少字段 "${key}"`);
  return value.trim();
}

function strList(data: Frontmatter, key: string, file: string): string[] {
  const value = data[key] ?? [];
  if (!Array.isArray(value) || value.some((v) => typeof v !== "string")) {
    fail(file, `字段 "${key}" 必须是字符串数组`);
  }
  return value as string[];
}

function accent(data: Frontmatter, file: string): Accent {
  const value = str(data, "accent", file);
  if (!(value in accentStyles)) fail(file, `accent 必须是 ${Object.keys(accentStyles).join(" / ")} 之一`);
  return value as Accent;
}

function readCollection<T>(dir: string, parse: (data: Frontmatter, body: string, slug: string, file: string) => T) {
  const folder = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(folder)) return [];

  return fs
    .readdirSync(folder)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const file = `content/${dir}/${name}`;
      const { data, content } = matter(fs.readFileSync(path.join(folder, name), "utf8"));
      return parse(data, content.trim(), name.replace(/\.md$/, ""), file);
    });
}

const byDateDesc = (a: { date: string }, b: { date: string }) => b.date.localeCompare(a.date);

/* ------------------------------------------------------------------ */
/* 新闻                                                                */
/* ------------------------------------------------------------------ */

export const getAllNews = cache((): NewsArticle[] =>
  readCollection("news", (data, body, slug, file) => ({
    slug,
    title: str(data, "title", file),
    date: str(data, "date", file),
    category: str(data, "category", file),
    summary: str(data, "summary", file),
    featured: data.featured === true,
    body,
  })).sort(byDateDesc),
);

export function getNews(slug: string) {
  return getAllNews().find((item) => item.slug === slug);
}

export function getLatestNews(limit = 3) {
  return getAllNews().slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* 项目案例                                                             */
/* ------------------------------------------------------------------ */

export const getAllCases = cache((): CaseStudy[] =>
  readCollection("cases", (data, body, slug, file) => ({
    slug,
    title: str(data, "title", file),
    date: str(data, "date", file),
    industry: str(data, "industry", file),
    client: str(data, "client", file),
    summary: str(data, "summary", file),
    icon: str(data, "icon", file) as IconName,
    accent: accent(data, file),
    cover: typeof data.cover === "string" && data.cover.trim() ? data.cover.trim() : undefined,
    products: strList(data, "products", file),
    results: strList(data, "results", file),
    featured: data.featured === true,
    body,
  })).sort(byDateDesc),
);

export function getCase(slug: string) {
  return getAllCases().find((item) => item.slug === slug);
}

/** 首页展示的案例：优先 featured，其次按时间 */
export function getFeaturedCases(limit = 2) {
  const all = getAllCases();
  return [...all.filter((c) => c.featured), ...all.filter((c) => !c.featured)].slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* 产品                                                                */
/* ------------------------------------------------------------------ */

export function getAllProducts(): Product[] {
  return [...products].sort((a, b) => a.order - b.order);
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter((p) => p.featured);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

/** 引用某产品的案例 */
export function getCasesByProduct(slug: string) {
  return getAllCases().filter((c) => c.products.includes(slug));
}
