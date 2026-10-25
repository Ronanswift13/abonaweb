import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CirclePlay } from "lucide-react";

import { CaseCard } from "@/components/cards/CaseCard";
import { CTA } from "@/components/sections/CTA";
import { PageHeader } from "@/components/sections/PageHeader";
import {
  ArchitectureStack,
  FeatureGrid,
  PluginMatrix,
  ProductSectionNav,
  ProductStats,
  TechStack,
} from "@/components/sections/ProductTech";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { home } from "@/data/home";
import { getAllProducts, getCasesByProduct, getProduct } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import type { IconName, Product, SectionIntro } from "@/types";

interface DetailSection extends SectionIntro {
  id: string;
  /** 页内导航上的短名称 */
  label: string;
  icon: IconName;
  content: React.ReactNode;
}

/** 按产品已有的数据组装详情页区块；没有数据的区块不出现，导航与背景交替随之调整 */
function buildSections(product: Product): DetailSection[] {
  const sections: (DetailSection | false)[] = [
    {
      id: "features",
      label: "核心功能",
      icon: "sparkles",
      eyebrow: "FEATURES",
      title: "核心功能",
      content: <FeatureGrid items={product.features} fallbackIcon={product.icon} />,
    },
    !!product.architecture && {
      id: "architecture",
      label: "技术架构",
      icon: "layers",
      eyebrow: "ARCHITECTURE",
      title: "技术架构",
      description: product.architecture.description,
      content: <ArchitectureStack layers={product.architecture.layers} />,
    },
    !!product.plugins && {
      id: "plugins",
      label: "监测插件",
      icon: "puzzle",
      eyebrow: "PLUGINS",
      title: "监测插件矩阵",
      description: product.plugins.description,
      content: <PluginMatrix groups={product.plugins.groups} note={product.plugins.note} />,
    },
    !!product.technologies?.length && {
      id: "technology",
      label: "关键技术",
      icon: "cpu",
      eyebrow: "KEY TECHNOLOGIES",
      title: "关键技术",
      content: <FeatureGrid items={product.technologies} fallbackIcon={product.icon} columns={3} />,
    },
    {
      id: "scenarios",
      label: "应用场景",
      icon: "target",
      eyebrow: "SCENARIOS",
      title: "应用场景",
      content: (
        <ul
          className={cn(
            "mt-10 grid gap-4 sm:grid-cols-2",
            product.scenarios.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4",
          )}
        >
          {product.scenarios.map((scenario, index) => (
            <li key={scenario} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
              <span className="text-gradient text-2xl font-bold">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-3 font-semibold text-ink-800">{scenario}</p>
            </li>
          ))}
        </ul>
      ),
    },
    !!product.security && {
      id: "security",
      label: "安全设计",
      icon: "shield",
      eyebrow: "SECURITY",
      title: "安全设计",
      description: product.security.description,
      content: <FeatureGrid items={product.security.items} fallbackIcon="shield" columns={3} />,
    },
    !!product.techStack?.length && {
      id: "stack",
      label: "技术栈",
      icon: "server",
      eyebrow: "TECH STACK",
      title: "技术栈",
      content: <TechStack groups={product.techStack} />,
    },
  ];
  return sections.filter((s): s is DetailSection => s !== false);
}

// 仅生成 data/products.ts 中存在的产品，其余路径返回 404
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({ title: product.name, description: product.summary, path: `/products/${slug}` });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const relatedCases = getCasesByProduct(product.slug);
  const sections = buildSections(product);

  return (
    <>
      <PageHeader
        eyebrow={product.tag}
        title={product.name}
        description={product.description}
        breadcrumbs={[
          { label: "产品与解决方案", href: "/products" },
          { label: product.name, href: `/products/${product.slug}` },
        ]}
      >
        {product.nameEn && <p className="mt-2 text-lg font-semibold text-brand-700">{product.nameEn}</p>}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact#solution" size="lg" arrow>
            获取解决方案
          </ButtonLink>
          {product.demo && (
            <ButtonLink
              href="#demo"
              variant="secondary"
              size="lg"
              icon={<CirclePlay className="size-5 text-brand-600" aria-hidden="true" />}
            >
              观看产品演示
            </ButtonLink>
          )}
        </div>
        {product.stats && <ProductStats stats={product.stats} note={product.statsNote} />}
        {sections.length > 2 && <ProductSectionNav items={sections} />}
      </PageHeader>

      {/* 技术方案各区块（白 / 浅灰交替） */}
      {sections.map((section, index) => (
        <section key={section.id} id={section.id} className={cn("py-20", index % 2 === 1 && "bg-ink-50/70")}>
          <Container>
            <SectionHeading eyebrow={section.eyebrow} title={section.title} description={section.description} />
            {section.content}
          </Container>
        </section>
      ))}

      {/* 产品演示：有视频时播放视频，否则显示预约演示占位卡 */}
      {product.demo?.video && (
        <section id="demo" className="py-20">
          <Container>
            <div className="relative isolate overflow-hidden rounded-[2rem] bg-night-gradient p-5 sm:p-8 lg:p-10">
              <div className="absolute inset-0 -z-10 bg-grid-dark bg-grid opacity-60" aria-hidden="true" />
              <div
                className="absolute -top-24 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl"
                aria-hidden="true"
              />
              <SectionHeading
                eyebrow="PRODUCT DEMO"
                title={product.demo.title}
                description={product.demo.description}
                invert
                action={
                  <ButtonLink href="/contact" variant="light">
                    预约演示
                  </ButtonLink>
                }
              />
              <video
                className="mt-8 aspect-video w-full rounded-2xl bg-black shadow-2xl ring-1 ring-white/15"
                controls
                playsInline
                preload="metadata"
                poster={product.demo.video.poster}
                aria-label={product.demo.title}
              >
                <source src={product.demo.video.src} type="video/mp4" />
                您的浏览器不支持视频播放，请
                <a href={product.demo.video.src} className="underline">
                  下载视频
                </a>
                观看。
              </video>
            </div>
          </Container>
        </section>
      )}
      {product.demo && !product.demo.video && (
        <section id="demo" className="py-20">
          <Container>
            <div className="relative isolate flex aspect-video max-h-[520px] w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-night-gradient p-8 text-center">
              <div className="absolute inset-0 -z-10 bg-grid-dark bg-grid opacity-60" aria-hidden="true" />
              <div className="absolute -z-10 size-72 rounded-full bg-brand-500/25 blur-3xl" aria-hidden="true" />
              {/* 【占位】替换为 <video> 或第三方视频嵌入 */}
              <span className="flex size-20 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/30 backdrop-blur">
                <CirclePlay className="size-10" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-2xl font-bold text-white">{product.demo.title}</h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-300 sm:text-base">{product.demo.description}</p>
              <ButtonLink href="/contact" variant="light" className="mt-6">
                预约演示
              </ButtonLink>
            </div>
          </Container>
        </section>
      )}

      {/* 相关案例 */}
      {relatedCases.length > 0 && (
        <section className="pb-4 pt-4">
          <Container>
            <SectionHeading eyebrow="CASE STUDIES" title="相关案例" />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedCases.map((item) => (
                <CaseCard key={item.slug} item={item} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTA content={home.cta} />
    </>
  );
}
