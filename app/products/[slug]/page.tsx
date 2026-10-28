import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CirclePlay } from "lucide-react";

import { CaseCard } from "@/components/cards/CaseCard";
import { CTA } from "@/components/sections/CTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { FieldPhotos, InteractionFlow, PhoneScreens, TwinShowcase } from "@/components/sections/ProductMedia";
import {
  ArchitectureStack,
  FeatureGrid,
  PluginMatrix,
  PluginOverview,
  ProductStats,
  TechStack,
} from "@/components/sections/ProductTech";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScreenGallery } from "@/components/ui/ScreenGallery";
import { SectionNav } from "@/components/ui/SectionNav";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { home } from "@/data/home";
import { getAllProducts, getCasesByProduct, getProduct } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import type { Product, SectionIntro } from "@/types";

interface DetailSection extends SectionIntro {
  id: string;
  /** 页内导航上的短名称 */
  label: string;
  content: React.ReactNode;
}

/** 按产品已有的数据组装详情页区块；没有数据的区块不出现，导航与背景交替随之调整 */
function buildSections(product: Product): DetailSection[] {
  const sections: (DetailSection | false)[] = [
    {
      id: "features",
      label: "核心功能",
      eyebrow: "FEATURES",
      title: "核心功能",
      content: <FeatureGrid items={product.features} />,
    },
    !!product.flow && {
      id: "flow",
      label: "交互流程",
      eyebrow: "WORKFLOW",
      title: product.flow.title,
      description: product.flow.description,
      content: <InteractionFlow steps={product.flow.steps} loop={product.flow.loop} guardrails={product.flow.guardrails} />,
    },
    !!product.screens && {
      id: "screens",
      label: "界面展示",
      eyebrow: "INTERFACE",
      title: "界面展示",
      description: product.screens.description,
      content:
        product.screens.device === "phone" ? (
          <PhoneScreens items={product.screens.items} note={product.screens.note} />
        ) : (
          <>
            <ScreenGallery items={product.screens.items} label={`${product.name}界面截图`} />
            {product.screens.note && <p className="mt-6 text-xs leading-relaxed text-ink-400">注：{product.screens.note}</p>}
          </>
        ),
    },
    !!product.twin && {
      id: "twin",
      label: "数字孪生",
      eyebrow: "DIGITAL TWIN",
      title: "数字孪生",
      description: product.twin.description,
      content: (
        <TwinShowcase
          video={product.twin.video}
          steps={product.twin.steps}
          note={product.twin.note}
          label={`${product.name}数字孪生演示`}
        />
      ),
    },
    !!product.architecture && {
      id: "architecture",
      label: "技术架构",
      eyebrow: "ARCHITECTURE",
      title: "技术架构",
      description: product.architecture.description,
      content: <ArchitectureStack layers={product.architecture.layers} />,
    },
    !!product.plugins && {
      id: "plugins",
      label: "监测插件",
      eyebrow: "PLUGINS",
      title: "监测插件矩阵",
      description: product.plugins.description,
      content: (
        <>
          <PluginOverview groups={product.plugins.groups} />
          <PluginMatrix groups={product.plugins.groups} note={product.plugins.note} />
        </>
      ),
    },
    !!product.field && {
      id: "field",
      label: "现场实拍",
      eyebrow: "FIELD",
      title: "现场实拍",
      description: product.field.description,
      content: <FieldPhotos items={product.field.items} plugins={product.plugins?.groups} note={product.field.note} />,
    },
    !!product.technologies?.length && {
      id: "technology",
      label: "关键技术",
      eyebrow: "KEY TECHNOLOGIES",
      title: "关键技术",
      content: <FeatureGrid items={product.technologies} columns={3} />,
    },
    {
      id: "scenarios",
      label: "应用场景",
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
              <span className="text-brand-700 text-2xl font-bold">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-3 font-semibold text-ink-800">{scenario}</p>
            </li>
          ))}
        </ul>
      ),
    },
    !!product.security && {
      id: "security",
      label: "安全设计",
      eyebrow: "SECURITY",
      title: "安全设计",
      description: product.security.description,
      content: <FeatureGrid items={product.security.items} columns={3} />,
    },
    !!product.techStack?.length && {
      id: "stack",
      label: "技术栈",
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
      </PageHeader>

      {sections.length > 2 && (
        <SectionNav
          items={[
            ...sections.map(({ id, label }) => ({ id, label })),
            ...(product.demo ? [{ id: "demo", label: "产品演示" }] : []),
          ]}
        />
      )}

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
            <div className="rounded-2xl bg-night p-5 sm:p-8 lg:p-10">
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
            {/* 暂无演示视频：不放播放按钮，直接说明如何预约 */}
            <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50/60 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-ink-900">{product.demo.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-500 sm:text-base">{product.demo.description}</p>
              <ButtonLink href="/contact" className="mt-6">
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
