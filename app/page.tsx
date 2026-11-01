import type { Metadata } from "next";

import { CasesNewsSection } from "@/components/sections/CasesNewsSection";
import { Hero } from "@/components/sections/Hero";
import { PlanScene, ProductScenes } from "@/components/sections/Scenes";
import { TeamSection } from "@/components/sections/TeamSection";
import { home } from "@/data/home";
import { team } from "@/data/team";
import { getAllCases, getLatestNews } from "@/lib/content";

// 首页使用 layout 中的默认标题与描述
export const metadata: Metadata = { alternates: { canonical: "/" } };

/**
 * 首页。一屏一事，顺序：三维站、四款产品、发展计划、案例新闻、团队
 * 导航与页脚在 app/layout.tsx，版式规则见 DESIGN.md。
 */
export default function HomePage() {
  return (
    <>
      <Hero content={home.hero} />
      <ProductScenes />
      <PlanScene />
      <CasesNewsSection content={home.casesNews} cases={getAllCases()} news={getLatestNews(3)} />
      <TeamSection intro={home.team} members={team} more={home.team.more} />
    </>
  );
}
