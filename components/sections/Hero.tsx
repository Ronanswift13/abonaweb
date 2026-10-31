import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { HeroContent } from "@/types";

/** 首屏：公司名称 + 业务介绍 + 入口按钮；右侧为产品界面截图 */
export function Hero({ content }: { content: HeroContent }) {
  const { title, description, primaryCta, secondaryCta, visual } = content;

  return (
    <section className="border-b border-ink-100 bg-white">
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="lg:col-span-5">
          <h1 className="text-[1.6rem] font-bold leading-tight text-ink-900 sm:text-4xl">{title}</h1>
          <p className="mt-5 text-base leading-relaxed text-ink-600 sm:text-[17px]">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={primaryCta.href} size="lg">
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="secondary" size="lg">
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <figure className="lg:col-span-7">
          <div className="overflow-hidden rounded-md border border-ink-200 bg-ink-900">
            <Image
              src={visual.src}
              width={visual.width}
              height={visual.height}
              alt={visual.alt}
              priority
              sizes="(min-width: 1024px) 700px, 100vw"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-2 text-sm text-ink-500">{visual.caption ?? visual.title}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
