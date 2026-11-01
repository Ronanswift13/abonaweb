import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CirclePlay } from "lucide-react";

import { CaseCard } from "@/components/cards/CaseCard";
import { FieldPhotos, InteractionFlow, PhoneScreens, TwinShowcase } from "@/components/sections/ProductMedia";
import {
  ArchitectureStack,
  FeatureGrid,
  PluginMatrix,
  PluginOverview,
  ProductStats,
  TechStack,
} from "@/components/sections/ProductTech";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Phrases } from "@/components/ui/Phrases";
import { ScreenGallery } from "@/components/ui/ScreenGallery";
import { SectionNav } from "@/components/ui/SectionNav";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { getAllProducts, getCasesByProduct, getProduct } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import type { Product, SectionIntro } from "@/types";

interface DetailSection extends SectionIntro {
  id: string;
  /** 页内导航上的短名称 */
  label: string;
  /** side：标题吸顶在左、内容在右，用于文字条目；默认通栏，用于图片和图表 */
  layout?: "side";
  content: React.ReactNode;
}

/** 按产品已有的数据组装详情页区块；没有数据的区块不出现，导航随之调整 */
function buildSections(product: Product): DetailSection[] {
  const sections: (DetailSection | false)[] = [
    {
      id: "features",
      label: "核心功能",
      title: "核心功能",
      layout: "side",
      content: <FeatureGrid items={product.features} />,
    },
    !!product.flow && {
      id: "flow",
      label: "交互流程",
      title: product.flow.title,
      description: product.flow.description,
      content: <InteractionFlow steps={product.flow.steps} loop={product.flow.loop} guardrails={product.flow.guardrails} />,
    },
    !!product.screens && {
      id: "screens",
      label: "界面展示",
      title: "界面展示",
      description: product.screens.description,
      content:
        product.screens.device === "phone" ? (
          <PhoneScreens items={product.screens.items} note={product.screens.note} />
        ) : (
          <>
            <ScreenGallery items={product.screens.items} label={`${product.name}界面截图`} />
            {product.screens.note && <p className="mt-6 max-w-[38em] text-[15px] leading-relaxed">注：{product.screens.note}</p>}
          </>
        ),
    },
    !!product.twin && {
      id: "twin",
      label: "数字孪生",
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
      title: "技术架构",
      description: product.architecture.description,
      content: <ArchitectureStack layers={product.architecture.layers} />,
    },
    !!product.plugins && {
      id: "plugins",
      label: "监测插件",
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
      title: "现场实拍",
      description: product.field.description,
      content: <FieldPhotos items={product.field.items} plugins={product.plugins?.groups} note={product.field.note} />,
    },
    !!product.technologies?.length && {
      id: "technology",
      label: "关键技术",
      title: "关键技术",
      layout: "side",
      content: <FeatureGrid items={product.technologies} />,
    },
    {
      id: "scenarios",
      label: "应用场景",
      title: "应用场景",
      layout: "side",
      content: (
        <ul className="space-y-3">
          {product.scenarios.map((scenario) => (
            <li key={scenario} className="max-w-[36em]">
              {scenario}
            </li>
          ))}
        </ul>
      ),
    },
    !!product.security && {
      id: "security",
      label: "安全设计",
      title: "安全设计",
      description: product.security.description,
      layout: "side",
      content: <FeatureGrid items={product.security.items} />,
    },
    !!product.techStack?.length && {
      id: "stack",
      label: "技术栈",
      title: "技术栈",
      layout: "side",
      content: <TechStack groups={product.techStack} />,
    },
  ];
  return sections.filter((s): s is DetailSection => s !== false);
}

function DetailBlock({ section }: { section: DetailSection }) {
  const side = section.layout === "side";
  return (
    <section id={section.id}>
      <Container className={cn("py-16 sm:py-20", side && "grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14")}>
        <div className={cn(side && "lg:sticky lg:top-40 lg:self-start")}>
          <SectionHeading title={section.title} description={section.description} />
        </div>
        <div>{section.content}</div>
      </Container>
    </section>
  );
}

/** 产品名 + 一句话说明 + 现状 + 动作 */
function HeroCopy({ product }: { product: Product }) {
  const hasVideo = !!product.demo?.video;
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "产品与解决方案", href: "/products" },
          { label: product.name, href: `/products/${product.slug}` },
        ]}
      />
      <h1
        className={cn(
          "mt-10",
          product.hero
            ? "text-[2.5rem] leading-[1.14] sm:text-6xl lg:text-[clamp(2.75rem,4vw,4rem)]"
            : "text-[3.25rem] leading-none lg:text-[clamp(3.5rem,9vw,9.5rem)]",
        )}
      >
        <Phrases text={product.headline ?? product.name} />
      </h1>
      <p className="mt-5 max-w-[32em]">{product.summary}</p>
      {product.status && <p className="mt-3 max-w-[32em]">{product.status}</p>}
      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <ButtonLink
          href={hasVideo ? "#demo" : "/contact#solution"}
          variant="theme"
          icon={hasVideo ? <CirclePlay className="size-5" aria-hidden="true" /> : undefined}
        >
          {hasVideo ? "看演示视频" : "看合作流程"}
        </ButtonLink>
        {hasVideo && <TextLink href="/contact#solution">看合作流程</TextLink>}
      </div>
    </>
  );
}

/** 产品页头：视频铺满或竖屏录屏；没有界面的产品放人物形象 */
function ProductHero({ product }: { product: Product }) {
  const { hero, figure, theme } = product;

  if (!hero) {
    return (
      <section data-nav={theme} className="relative overflow-clip lg:min-h-[calc(100svh-72px)]">
        <Container className="relative z-10 pt-4 lg:pb-14">
          <div className="lg:max-w-[52%]">
            <HeroCopy product={product} />
          </div>
        </Container>
        {figure && (
          <Image
            src={figure.src}
            width={figure.width}
            height={figure.height}
            alt={figure.alt}
            priority
            sizes="(min-width: 1024px) 50vw, 90vw"
            className="ml-auto mt-8 h-auto w-[86vw] max-w-[440px] lg:absolute lg:bottom-0 lg:right-[3vw] lg:mt-0 lg:h-[92%] lg:w-auto lg:max-w-none"
          />
        )}
      </section>
    );
  }

  if (hero.kind === "phone") {
    return (
      <section data-nav={theme} className="overflow-clip">
        <Container className="flex flex-col gap-8 pt-4 lg:min-h-[calc(100svh-72px)] lg:flex-row lg:items-center lg:justify-between lg:gap-14">
          <div className="max-w-[660px] lg:pb-14">
            <HeroCopy product={product} />
          </div>
          <LoopVideo
            video={hero.video}
            label={hero.label}
            className="mx-auto aspect-[780/1688] h-[118vw] max-h-[720px] w-auto rounded-t-[28px] object-cover object-top lg:mx-0 lg:mr-[8vw] lg:h-[calc(100svh-104px)] lg:max-h-none lg:self-end"
          />
        </Container>
      </section>
    );
  }

  return (
    <section data-nav={theme} className="relative flex flex-col overflow-clip lg:block lg:min-h-[calc(100svh-72px)]">
      <LoopVideo
        video={hero.video}
        label={hero.label}
        className="order-2 h-[66vw] w-full object-cover object-[100%_30%] lg:absolute lg:inset-0 lg:h-full lg:object-[100%_50%]"
      />
      <div className="scrim-left absolute inset-0 hidden lg:block" aria-hidden="true" />
      <Container className="relative z-10 order-1 pb-8 pt-4 lg:pb-14">
        <div className="max-w-[640px]">
          <HeroCopy product={product} />
        </div>
      </Container>
    </section>
  );
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
    <div data-product-theme={product.theme} className="bg-theme-bg text-theme-fg">
      <ProductHero product={product} />

      <div data-nav={product.theme}>
        {/* 演示视频放在页头之后：这是最能说明产品的内容 */}
        {product.demo?.video && (
          <section id="demo">
            <Container className="grid gap-8 py-14 sm:py-20 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:items-end lg:gap-14">
              <div>
                <h2 className="text-[1.75rem] leading-snug text-theme-heading sm:text-3xl">{product.demo.title}</h2>
                <p className="mt-4">{product.demo.description}</p>
              </div>
              <video
                className="aspect-video w-full"
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
            </Container>
          </section>
        )}

        {sections.length > 2 && (
          <SectionNav
            items={[
              ...(product.demo?.video ? [{ id: "demo", label: "产品演示" }] : []),
              ...sections.map(({ id, label }) => ({ id, label })),
              ...(product.demo && !product.demo.video ? [{ id: "demo", label: "模型演示" }] : []),
            ]}
          />
        )}

        {product.stats && <ProductStats stats={product.stats} note={product.statsNote} />}

        {sections.map((section) => (
          <DetailBlock key={section.id} section={section} />
        ))}

        {/* 暂无演示视频：不放播放按钮，直接说明如何联系 */}
        {product.demo && !product.demo.video && (
          <section id="demo" className="pb-20">
            <Container>
              <SectionHeading title={product.demo.title} description={product.demo.description} />
              <ButtonLink href="/contact" variant="theme" className="mt-6">
                看联系方式
              </ButtonLink>
            </Container>
          </section>
        )}

        {/* 相关案例 */}
        {relatedCases.length > 0 && (
          <section className="pb-20 sm:pb-24">
            <Container className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
              <SectionHeading title="相关案例" />
              <div>
                {relatedCases.map((item) => (
                  <CaseCard key={item.slug} item={item} showSummary />
                ))}
              </div>
            </Container>
          </section>
        )}
      </div>
    </div>
  );
}
