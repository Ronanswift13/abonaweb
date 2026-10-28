import Image from "next/image";
import { CirclePlay } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { HeroContent } from "@/types";

/** 首屏：公司全称 + 做什么（具体场景）+ CTA；右侧为真实产品截图 */
export function Hero({ content }: { content: HeroContent }) {
  const { badge, title, model, description, primaryCta, secondaryCta, highlights, visual } = content;

  return (
    <section className="border-b border-ink-100 bg-white">
      <Container className="grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-12 lg:pb-24 lg:pt-20">
        {/* 左：文案 */}
        <div className="lg:col-span-6">
          <p className="inline-flex items-center gap-2 border-l-2 border-brand-700 pl-3 text-sm text-ink-600">{badge}</p>

          <h1 className="mt-6 text-[1.6rem] font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl xl:text-[2.6rem]">
            {title}
          </h1>
          <p className="mt-3 text-base text-ink-500 sm:text-lg">
            自研行业大模型「<span className="font-semibold text-brand-700">{model.name}</span>」（{model.nameEn}）·{" "}
            {model.tagline}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-[17px]">{description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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

          <dl className="mt-10 grid max-w-xl gap-y-4 border-t border-ink-100 pt-6 sm:grid-cols-3 sm:divide-x sm:divide-ink-100">
            {highlights.map((item) => (
              <div key={item.label} className="sm:px-4 sm:first:pl-0">
                <dt className="sr-only">{item.label}</dt>
                <dd className="text-2xl font-bold text-ink-900">{item.value}</dd>
                <dd className="mt-1 text-xs leading-relaxed text-ink-500 sm:text-sm">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 右：真实产品截图 */}
        <figure className="lg:col-span-6">
          <div className="overflow-hidden rounded-xl border border-ink-200 bg-ink-900 shadow-card">
            <Image
              src={visual.src}
              width={visual.width}
              height={visual.height}
              alt={visual.alt}
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 text-sm leading-relaxed text-ink-500">
            <span className="font-medium text-ink-700">{visual.title}</span>
            {visual.caption && <>：{visual.caption}</>}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
