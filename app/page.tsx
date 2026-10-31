import type { Metadata } from "next";

import { BusinessSection } from "@/components/sections/BusinessSection";
import { CasesNewsSection } from "@/components/sections/CasesNewsSection";
import { CTA } from "@/components/sections/CTA";
import { Hero } from "@/components/sections/Hero";
import { PlanSpotlight } from "@/components/sections/PlanSections";
import { ProductSection } from "@/components/sections/ProductSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { Container } from "@/components/ui/Container";
import { businessDirections } from "@/data/business";
import { home } from "@/data/home";
import { yuanyinPlan } from "@/data/plans";
import { team } from "@/data/team";
import { getFeaturedCases, getFeaturedProducts, getLatestNews } from "@/lib/content";

// 首页使用 layout 中的默认标题与描述
export const metadata: Metadata = { alternates: { canonical: "/" } };

/**
 * 首页
 * 区块顺序：Hero → 核心产品 → 业务方向 → 发展计划 → 案例与新闻 → 核心团队 → CTA
 * （导航与页脚在 app/layout.tsx）。调整顺序或增删区块只需改动下方 JSX。
 */
export default function HomePage() {
  return (
    <>
      <Hero content={home.hero} />
      <ProductSection intro={home.products} products={getFeaturedProducts()} />
      <BusinessSection intro={home.business} items={businessDirections} />
      <section className="bg-white pt-20 sm:pt-24">
        <Container>
          <PlanSpotlight plan={yuanyinPlan} />
        </Container>
      </section>
      <CasesNewsSection content={home.casesNews} cases={getFeaturedCases(2)} news={getLatestNews(4)} />
      <TeamSection intro={home.team} members={team} more={home.team.more} />
      <CTA content={home.cta} />
    </>
  );
}
