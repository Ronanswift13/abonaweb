import Image from "next/image";
import { CirclePlay, Sparkles } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import type { HeroContent } from "@/types";

/** 首屏：公司全称 + 自研大模型「艾博纳幺儿」+ 价值主张 + CTA；右侧为示意面板 */
export function Hero({ content }: { content: HeroContent }) {
  const { badge, title, model, description, primaryCta, secondaryCta, highlights } = content;

  return (
    <section className="relative isolate overflow-hidden bg-white">
      <HeroBackground />

      <Container className="grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-24">
        {/* 左：文案 */}
        <div className="lg:col-span-7">
          <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-4 py-1.5 text-xs font-medium text-brand-700 shadow-sm backdrop-blur sm:text-sm">
            <Sparkles className="size-4 text-brand-600" aria-hidden="true" />
            {badge}
          </p>

          <h1
            className="mt-6 animate-fade-up text-[1.6rem] font-extrabold leading-tight tracking-tight text-ink-900 [animation-delay:80ms] sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl"
          >
            {title}
          </h1>

          <p className="mt-5 flex animate-fade-up flex-wrap items-baseline gap-x-3 gap-y-1 [animation-delay:160ms]">
            <span className="text-sm font-medium text-ink-500 sm:text-base">自研大模型</span>
            <span className="text-gradient text-3xl font-extrabold sm:text-4xl">「{model.name}」</span>
            <span className="text-lg font-semibold tracking-wide text-brand-700 sm:text-xl">{model.nameEn}</span>
          </p>
          <p className="mt-2 animate-fade-up text-base font-medium text-ink-700 [animation-delay:200ms] sm:text-lg">
            {model.tagline}
          </p>

          <p className="mt-6 max-w-2xl animate-fade-up text-base leading-relaxed text-ink-500 [animation-delay:240ms] sm:text-lg">
            {description}
          </p>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:320ms] sm:flex-row sm:items-center">
            <ButtonLink href={primaryCta.href} size="lg" arrow>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={secondaryCta.href}
              variant="secondary"
              size="lg"
              icon={<CirclePlay className="size-5" aria-hidden="true" />}
            >
              {secondaryCta.label}
            </ButtonLink>
          </div>

          <dl className="mt-12 grid max-w-xl animate-fade-up grid-cols-3 divide-x divide-ink-100 [animation-delay:400ms]">
            {highlights.map((item) => (
              <div key={item.label} className="px-4 first:pl-0">
                <dt className="sr-only">{item.label}</dt>
                <dd className="text-gradient text-2xl font-bold sm:text-3xl">{item.value}</dd>
                <dd className="mt-1 text-xs text-ink-500 sm:text-sm">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 右：示意面板 */}
        <div className="animate-fade-up [animation-delay:240ms] lg:col-span-5">
          <HeroVisual demo={content.demo} />
        </div>
      </Container>
    </section>
  );
}

/** 背景：网格 + 流动渐变光斑 */
function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div className="absolute inset-0 bg-grid-light bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_60%_30%,black,transparent)]" />
      <div className="absolute -right-32 -top-40 size-[640px] animate-float rounded-full bg-ink-100/60 blur-3xl" />
      <div className="absolute -bottom-48 -left-40 size-[560px] animate-float-slow rounded-full bg-brand-100/50 blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" />
    </div>
  );
}

/** 右侧示意：模拟「艾博纳幺儿」主动分析对话 */
function HeroVisual({ demo }: { demo: HeroContent["demo"] }) {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      {/* 轨道装饰 */}
      <div className="absolute left-1/2 top-1/2 -z-10 size-[115%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-brand-200" />
        <div className="absolute inset-[12%] rounded-full border border-ink-200/60" />
        <div className="absolute inset-[24%] rounded-full bg-brand-gradient opacity-[0.06] blur-2xl" />
      </div>

      <div className="relative rounded-3xl border border-white/70 bg-white/80 p-5 shadow-card-hover backdrop-blur-xl sm:p-6">
        {/* 面板头 */}
        <div className="flex items-center gap-3 border-b border-ink-100 pb-4">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-ink-50 to-white ring-1 ring-ink-100">
            <Image src={site.logo.src} alt="" width={site.logo.width} height={site.logo.height} className="h-7 w-auto" />
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-ink-900">{demo.title}</p>
            <p className="flex items-center gap-1.5 text-xs text-ink-500">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {demo.status}
            </p>
          </div>
        </div>

        {/* 对话 */}
        <div className="space-y-3 py-5">
          {demo.messages.map((message, index) => (
            <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
              <p
                className={cn(
                  "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  message.role === "user"
                    ? "rounded-br-md bg-ink-800 text-white"
                    : "rounded-bl-md border border-brand-100 bg-brand-gradient-soft text-ink-700",
                )}
              >
                {message.text}
              </p>
            </div>
          ))}
        </div>

        {/* 装饰性数据条 */}
        <div className="rounded-2xl bg-ink-50 p-4" aria-hidden="true">
          <div className="mb-3 flex items-center justify-between text-[11px] font-medium text-ink-400">
            <span>多源数据融合分析</span>
            <span className="text-brand-700">实时</span>
          </div>
          <div className="flex h-14 items-end gap-1">
            {[38, 52, 44, 60, 48, 70, 56, 82, 64, 92, 74, 58, 66, 50, 62, 46].map((h, i) => (
              <span
                key={i}
                className={cn("flex-1 rounded-sm", i === 9 ? "bg-brand-gradient" : "bg-brand-200/70")}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* 能力标签 */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {demo.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-brand-100 bg-white px-3 py-1 text-xs font-medium text-brand-700"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
