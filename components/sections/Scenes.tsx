import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GridMap } from "@/components/ui/GridMap";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Phrases } from "@/components/ui/Phrases";
import { home } from "@/data/home";
import type { Scene } from "@/types";

/**
 * 一屏一件产品（首页、/products 共用）
 * 产品保持原色，整屏底色用产品自己的主题色；视频在底层，遮罩在中层，文字在上层。规则见 DESIGN.md 第 2 节。
 */

const say = "font-display font-black";

/** 产品名 + 大字 + 说明 + 动作 */
function Copy({ scene, sayClass }: { scene: Scene; sayClass: string }) {
  return (
    <>
      <h2 className="text-2xl leading-snug text-theme-heading sm:text-[1.625rem]">{scene.title}</h2>
      <p className={`${say} mb-6 mt-2 leading-[1.12] ${sayClass}`}>
        <Phrases text={scene.say} />
      </p>
      <p className="max-w-[28em]">{scene.body}</p>
      <ButtonLink href={scene.action.href} variant="theme" className="mt-6">
        {scene.action.label}
      </ButtonLink>
    </>
  );
}

/** 破夜绘明：现场实拍在上，底部融进产品主题蓝 */
function PoyeScene() {
  const scene = home.scenes.poye;
  return (
    <section
      data-nav="poye"
      data-product-theme="poye"
      className="relative flex flex-col overflow-clip bg-theme-bg text-theme-fg lg:min-h-svh lg:justify-end"
    >
      <div className="relative lg:absolute lg:inset-x-0 lg:top-[72px] lg:h-[min(66vh,calc(37vw+60px))]">
        <LoopVideo
          video={{ src: "/videos/field-patrol.mp4", poster: "/videos/field-patrol.jpg" }}
          label="110kV 变电站巡视画面：主变、冷却风扇、油枕和高压套管"
          className="h-[46vw] w-full object-cover object-[50%_40%] lg:h-full"
        />
        <div className="scrim-bottom absolute inset-0" aria-hidden="true" />
      </div>
      <Container className="relative pb-12 pt-2 lg:pb-16">
        <h2 className="text-2xl leading-snug sm:text-[1.625rem]">{scene.title}</h2>
        <p className={`${say} mb-5 mt-2 text-[2.5rem] leading-[1.12] sm:text-5xl lg:text-[clamp(2.5rem,4.2vw,4rem)]`}>
          <Phrases text={scene.say} />
        </p>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
          <p className="max-w-[34em]">{scene.body}</p>
          <ButtonLink href={scene.action.href} variant="theme" className="self-start lg:self-auto">
            {scene.action.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

/** 自主AI交互系统：界面铺满，左侧压成产品近黑放文字，右侧保持清晰 */
function AgentScene() {
  const scene = home.scenes.agent;
  return (
    <section
      data-nav="agent"
      data-product-theme="agent"
      className="relative flex flex-col overflow-clip bg-theme-bg text-theme-fg lg:min-h-svh lg:flex-row lg:items-center"
    >
      <LoopVideo
        video={{ src: "/videos/duty-briefing.mp4", poster: "/videos/duty-briefing.jpg" }}
        label="自主AI交互系统界面：虚拟同事语音汇报，右侧是按优先级排序的风险卡片"
        className="order-2 h-[76vw] w-full object-cover object-[100%_12%] lg:absolute lg:inset-0 lg:h-full lg:object-[100%_50%]"
      />
      <div className="scrim-stage absolute inset-0 hidden lg:block" aria-hidden="true" />
      <Container className="relative z-10 order-1 pb-6 pt-12 lg:pb-0 lg:pt-[72px]">
        {/* 文字收在左侧，不盖住画面里的人物 */}
        <div className="lg:max-w-[min(520px,42vw)]">
          <Copy scene={scene} sayClass="text-[2.25rem] sm:text-5xl lg:text-[clamp(2.5rem,3.4vw,3.25rem)]" />
        </div>
      </Container>
    </section>
  );
}

/** 智慧后勤：手机界面保持原色，标题栏和这一屏同色 */
function LogisticsScene() {
  const scene = home.scenes.logistics;
  return (
    <section data-nav="logi" data-product-theme="logi" className="overflow-clip bg-theme-bg text-theme-fg">
      <Container className="flex flex-col gap-8 pt-12 lg:min-h-svh lg:flex-row lg:items-center lg:justify-between lg:gap-14 lg:pt-[104px]">
        <div className="max-w-[620px] lg:pb-16">
          <Copy scene={scene} sayClass="text-[2.5rem] sm:text-6xl lg:text-[clamp(3rem,5vw,4.5rem)]" />
        </div>
        <LoopVideo
          video={{ src: "/videos/logistics-flow.mp4", poster: "/videos/logistics-flow.jpg" }}
          label="智慧后勤助手操作录屏：输入一句话，生成确认卡，确认后返回申请单号"
          className="mx-auto aspect-[780/1688] h-[118vw] max-h-[720px] w-auto rounded-t-[28px] object-cover object-top lg:mx-0 lg:mr-[8vw] lg:h-[calc(100svh-104px)] lg:max-h-none lg:self-end"
        />
      </Container>
    </section>
  );
}

/** 艾博纳幺儿：底色取自人物形象背后的浅蓝，人物贴屏幕底边，名字压在人物左侧留白 */
function YaoerScene() {
  const scene = home.scenes.yaoer;
  return (
    <section
      data-nav="yaoer"
      data-product-theme="yaoer"
      className="relative overflow-clip bg-theme-bg text-theme-fg lg:flex lg:min-h-svh lg:items-center"
    >
      <Image
        src="/images/brand/yaoer.webp"
        width={1152}
        height={1194}
        sizes="(min-width: 1024px) 50vw, 90vw"
        alt="艾博纳幺儿的形象：穿深蓝立领外套的卡通人物，胸前有公司标志"
        className="order-2 hidden lg:absolute lg:bottom-0 lg:right-[3vw] lg:block lg:h-auto lg:w-[min(54vw,calc((100svh-96px)*0.965))] lg:max-w-none"
      />
      <Container className="relative z-10 py-14 lg:py-24">
        <h2 className="text-[3.25rem] leading-none lg:text-[clamp(3.5rem,9vw,9.5rem)]">{scene.title}</h2>
        {/* 文字收在人物左侧，不压到脸 */}
        <div className="lg:max-w-[46%]">
          <p className={`${say} mt-6 text-[1.75rem] leading-[1.3] lg:text-[clamp(1.75rem,2.7vw,2.5rem)]`}>
            <Phrases text={scene.say} />
          </p>
          <p className="mt-6">{scene.body}</p>
          <ButtonLink href={scene.action.href} variant="theme" className="mt-6">
            {scene.action.label}
          </ButtonLink>
        </div>
      </Container>
      <Image
        src="/images/brand/yaoer.webp"
        width={1152}
        height={1194}
        sizes="90vw"
        alt=""
        className="ml-auto h-auto w-[86vw] max-w-[440px] lg:hidden"
      />
    </section>
  );
}

/** 发展计划（首页、发展方向页）：矢量电网图，配色和破夜绘明的区域地图一致；署名是 ODbL 的要求，不能去掉 */
export function PlanScene() {
  const scene = home.scenes.plan;
  return (
    <section
      data-nav="plan"
      data-product-theme="plan"
      className="relative flex flex-col overflow-clip bg-theme-bg text-theme-fg lg:min-h-svh lg:flex-row lg:items-center"
    >
      <div className="relative order-2 h-[70vw] w-full lg:absolute lg:inset-0 lg:h-full">
        <GridMap alt="云南电网线路和变电站分布图" className="object-cover object-[76%_40%] lg:object-[100%_42%]" />
      </div>
      <div className="scrim-left absolute inset-0 hidden lg:block" aria-hidden="true" />
      <a
        href={scene.credit.href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-4 z-10 bg-theme-bg px-1.5 text-xs leading-normal hover:underline lg:bottom-4 lg:right-[88px]"
      >
        {scene.credit.label}
      </a>
      <Container className="relative z-10 order-1 pb-8 pt-12 lg:py-[72px]">
        <h2 className="max-w-[560px] text-[2.5rem] leading-[1.16] sm:text-5xl lg:text-[clamp(2.75rem,4.6vw,4.25rem)]">
          <Phrases text={scene.title} />
        </h2>
        <p className="my-6 max-w-[27em]">{scene.body}</p>
        <ButtonLink href={scene.action.href} variant="onDark">
          {scene.action.label}
        </ButtonLink>
      </Container>
    </section>
  );
}

export function ProductScenes() {
  return (
    <>
      <PoyeScene />
      <AgentScene />
      <LogisticsScene />
      <YaoerScene />
    </>
  );
}
