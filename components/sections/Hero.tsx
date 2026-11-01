import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Phrases } from "@/components/ui/Phrases";
import type { HeroContent } from "@/types";

/** 首屏：三维站铺满产品蓝，左侧遮罩放文字，公司红只留在按钮上 */
export function Hero({ content }: { content: HeroContent }) {
  const { title, description, action, video, label } = content;

  return (
    <section
      data-nav="poye"
      data-product-theme="poye"
      className="relative flex flex-col overflow-clip bg-theme-bg text-theme-fg lg:block lg:min-h-[calc(100svh-72px)]"
    >
      <LoopVideo
        video={video}
        label={label}
        className="order-2 h-[62vw] w-full object-cover object-[66%_50%] lg:absolute lg:inset-0 lg:h-full lg:object-[72%_50%]"
      />
      <div className="scrim-hero absolute inset-0 hidden lg:block" aria-hidden="true" />

      <Container className="relative z-[2] order-1 pb-8 pt-7 lg:pb-0 lg:pt-[clamp(48px,9vh,96px)]">
        <h1 className="text-[2rem] leading-[1.14] sm:text-5xl lg:text-[clamp(3rem,5.6vw,5.5rem)]">
          <Phrases text={title} />
        </h1>
        <p className="mb-7 mt-5 max-w-[30em] lg:mt-8">{description}</p>
        <ButtonLink href={action.href} variant="primary">
          {action.label}
        </ButtonLink>
      </Container>
    </section>
  );
}
