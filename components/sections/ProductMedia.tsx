import Image from "next/image";
import { ArrowUp, ChevronDown, ChevronRight } from "lucide-react";

import { InlineList } from "@/components/ui/InlineList";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { cn } from "@/lib/utils";
import type { Feature, FieldPhoto, FlowStep, PluginGroup, ProductImage, ProductVideo } from "@/types";

/**
 * 产品详情页的演示素材区块（/products/[slug]）
 * 素材来自各产品研发仓库的前端演示与现场实录，数据见 data/products.ts 中对应产品的可选字段。
 */

function Note({ children }: { children: React.ReactNode }) {
  return <p className="mt-6 max-w-[38em] text-[15px] leading-relaxed">{children}</p>;
}

/** 手机界面：三步操作并排，这是全站唯一的三列排布 */
export function PhoneScreens({ items, note }: { items: ProductImage[]; note?: string }) {
  return (
    <div className="mt-12">
      <ol className="grid gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-10">
        {items.map((item, index) => (
          <li key={item.src}>
            <figure className="max-w-[280px]">
              <Image src={item.src} width={item.width} height={item.height} alt={item.alt} sizes="280px" />
              <figcaption className="mt-5">
                <p className="font-bold text-theme-fg">
                  <span className="mr-2 text-theme-heading">{index + 1}</span>
                  {item.title}
                </p>
                {item.caption && <p className="mt-2 text-sm leading-relaxed text-theme-fg">{item.caption}</p>}
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
      {note && <Note>{note}</Note>}
    </div>
  );
}

/** 数字孪生（炭黑底）：左侧循环演示，右侧逐级下钻步骤 */
export function TwinShowcase({
  video,
  steps,
  note,
  label,
}: {
  video: ProductVideo;
  steps: Feature[];
  note?: string;
  label: string;
}) {
  return (
    <div className="mt-12">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="overflow-hidden bg-theme-bg lg:col-span-8">
          <LoopVideo video={video} label={label} className="aspect-video w-full" />
        </div>
        <ol className="lg:col-span-4">
          {steps.map((step) => (
            <li key={step.title} className="py-3 first:pt-0">
              <h3 className="font-bold text-theme-fg">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-theme-fg">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
      {note && <Note>{note}</Note>}
    </div>
  );
}

/** 现场实拍：第一张放大，其余竖排在右侧 */
export function FieldPhotos({
  items,
  plugins,
  note,
}: {
  items: FieldPhoto[];
  plugins?: PluginGroup[];
  note?: string;
}) {
  const pluginName = (id: string) => plugins?.flatMap((g) => g.plugins).find((p) => p.id === id)?.name;
  const caption = (item: FieldPhoto) => {
    const name = item.plugin && pluginName(item.plugin);
    return (
      <>
        <p className="font-bold text-theme-fg">{item.title}</p>
        {item.caption && <p className="mt-1 text-sm leading-relaxed text-theme-fg">{item.caption}</p>}
        {name && (
          <a
            href={`#plugin-${item.plugin}`}
            className="mt-1 inline-block text-[15px] font-bold text-theme-heading underline underline-offset-4"
          >
            对应插件：{name}
          </a>
        )}
      </>
    );
  };
  const [lead, ...rest] = items;

  return (
    <div className="mt-12">
      <div className="grid gap-8 lg:grid-cols-12">
        <figure className="lg:col-span-7">
          <Image
            src={lead.src}
            width={lead.width}
            height={lead.height}
            alt={lead.alt}
            sizes="(min-width: 1024px) 720px, 100vw"
            className="aspect-[4/3] w-full object-cover"
          />
          <figcaption className="mt-4">{caption(lead)}</figcaption>
        </figure>
        <div className="grid gap-5 lg:col-span-5">
          {rest.map((item) => (
            <figure key={item.src} className="grid grid-cols-[9rem_minmax(0,1fr)] gap-5 sm:grid-cols-[11rem_minmax(0,1fr)]">
              <Image
                src={item.src}
                width={item.width}
                height={item.height}
                alt={item.alt}
                sizes="176px"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption>{caption(item)}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      {note && <Note>{note}</Note>}
    </div>
  );
}

const ACTOR_LABEL: Record<FlowStep["actor"], string> = { system: "系统", human: "值守人员" };

/** 交互流程闭环图：大屏横向一行 + 底部回环；小屏纵向排列 */
export function InteractionFlow({
  steps,
  loop,
  guardrails,
}: {
  steps: FlowStep[];
  loop?: string;
  guardrails?: Feature[];
}) {
  return (
    <div className="mt-12">
      <ul className="mb-5 flex flex-wrap gap-4 text-sm text-theme-fg" aria-label="图例">
        <li className="inline-flex items-center gap-1.5">
          <span className="size-3 border border-theme-fg/15 bg-theme-bg" aria-hidden="true" />
          系统自动完成
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span className="size-3 bg-theme-accent" aria-hidden="true" />
          值守人员决定
        </li>
      </ul>

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        {steps.map((step, index) => {
          const human = step.actor === "human";
          return (
            <li
              key={step.title}
              className={cn(
                "relative flex flex-col p-5",
                human ? "bg-theme-accent text-theme-on-accent" : "bg-theme-fg/5",
              )}
            >
              <span className={cn("text-sm font-bold", human ? "text-theme-on-accent" : "text-theme-fg")}>
                {index + 1} {ACTOR_LABEL[step.actor]}
              </span>
              <h3 className={cn("mt-2 font-bold", human ? "text-theme-on-accent" : "text-theme-fg")}>{step.title}</h3>
              <p className={cn("mt-2 flex-1 text-sm leading-relaxed", human ? "text-theme-on-accent" : "text-theme-fg")}>
                {step.description}
              </p>
              {step.points && (
                <InlineList items={step.points} className="mt-3 text-sm leading-relaxed" />
              )}
              {index < steps.length - 1 && (
                <>
                  <ChevronRight
                    className="absolute -right-[1.15rem] top-9 z-10 hidden size-5 text-theme-fg lg:block"
                    aria-hidden="true"
                  />
                  <ChevronDown
                    className="absolute -bottom-[1.05rem] left-1/2 z-10 size-5 -translate-x-1/2 text-theme-fg sm:hidden"
                    aria-hidden="true"
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>

      {loop && (
        <>
          {/* 大屏：从最后一步回到第一步的回环线 */}
          <div className="relative mx-[8.33%] hidden h-10 border-x border-b border-dashed border-theme-fg/15 lg:block" aria-hidden="true">
            <ArrowUp className="absolute -left-[0.6rem] -top-1 size-5 bg-theme-bg text-theme-fg" />
          </div>
          <p className="mt-3 text-sm text-theme-fg lg:ml-[8.33%]">{loop}</p>
        </>
      )}

      {guardrails && guardrails.length > 0 && (
        <div className="mt-10 bg-theme-fg/5 p-6 sm:p-8">
          <h3 className="text-base font-bold text-theme-fg">系统限制</h3>
          <ul className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {guardrails.map((item) => (
              <li key={item.title} className="border-t border-theme-fg/15 pt-4">
                <p className="font-bold text-theme-fg">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-theme-fg">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
