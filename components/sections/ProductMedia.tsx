import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUp, Info } from "lucide-react";

import { Icon } from "@/components/ui/Icon";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { cn } from "@/lib/utils";
import type { Feature, FieldPhoto, FlowStep, PluginGroup, ProductImage, ProductVideo } from "@/types";

/**
 * 产品详情页的演示素材区块（/products/[slug]）
 * 素材来自各产品研发仓库的前端演示与现场实录，数据见 data/products.ts 中对应产品的可选字段。
 */

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-ink-400">
      <Info className="mt-px size-4 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

/** 手机界面：按操作步骤并排展示 */
export function PhoneScreens({ items, note }: { items: ProductImage[]; note?: string }) {
  return (
    <div className="mt-12">
      <ol className="grid gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-10">
        {items.map((item, index) => (
          <li key={item.src} className="relative">
            <figure className="mx-auto max-w-[280px]">
              <div className="overflow-hidden rounded-[2.25rem] border-[10px] border-ink-900 bg-ink-900 shadow-card-hover">
                <Image
                  src={item.src}
                  width={item.width}
                  height={item.height}
                  alt={item.alt}
                  sizes="280px"
                  className="h-auto w-full rounded-[1.5rem]"
                />
              </div>
              <figcaption className="mt-5">
                <p className="flex items-center gap-2 font-bold text-ink-900">
                  <span className="flex size-7 items-center justify-center rounded-full bg-brand-gradient text-xs text-white">
                    {index + 1}
                  </span>
                  {item.title}
                </p>
                {item.caption && <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.caption}</p>}
              </figcaption>
            </figure>
            {index < items.length - 1 && (
              <ArrowRight
                className="absolute -right-5 top-1/3 hidden size-6 text-brand-300 sm:block lg:-right-8"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
      {note && <Note>{note}</Note>}
    </div>
  );
}

/** 数字孪生示意：左侧循环演示，右侧逐级下钻步骤 */
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
        <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-night-gradient p-3 shadow-card-hover sm:p-4 lg:col-span-8">
          <div className="absolute inset-0 -z-10 bg-grid-dark bg-grid opacity-50" aria-hidden="true" />
          <LoopVideo video={video} label={label} className="aspect-video w-full rounded-2xl bg-black" />
        </div>
        <ol className="space-y-1 lg:col-span-4">
          {steps.map((step, index) => (
            <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
              {index < steps.length - 1 && (
                <span className="absolute left-5 top-11 h-[calc(100%-2.75rem)] w-px bg-brand-200" aria-hidden="true" />
              )}
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-600 ring-1 ring-brand-100">
                <Icon name={step.icon ?? "layers"} className="size-5" />
              </span>
              <div>
                <h3 className="font-bold text-ink-900">
                  <span className="mr-2 text-sm text-brand-600">{String(index + 1).padStart(2, "0")}</span>
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      {note && <Note>{note}</Note>}
    </div>
  );
}

/** 现场实拍：图片 + 图注 + 承接该环节的插件 */
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

  return (
    <div className="mt-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const name = item.plugin && pluginName(item.plugin);
          return (
            <figure key={item.src} className="flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
              <Image
                src={item.src}
                width={item.width}
                height={item.height}
                alt={item.alt}
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                className="aspect-[3/2] w-full object-cover"
              />
              <figcaption className="flex flex-1 flex-col p-5">
                <p className="font-bold text-ink-900">{item.title}</p>
                {item.caption && <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{item.caption}</p>}
                {name && (
                  <a
                    href={`#plugin-${item.plugin}`}
                    className="mt-4 inline-flex items-center gap-1 self-start rounded-md border border-brand-100 bg-brand-50/60 px-2 py-1 text-xs text-brand-800 transition-colors hover:border-brand-300"
                  >
                    承接插件：{name}
                    <ArrowRight className="size-3" aria-hidden="true" />
                  </a>
                )}
              </figcaption>
            </figure>
          );
        })}
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
      <ul className="mb-5 flex flex-wrap gap-4 text-xs text-ink-500" aria-label="图例">
        <li className="inline-flex items-center gap-1.5">
          <span className="size-3 rounded border border-ink-200 bg-white" aria-hidden="true" />
          系统自动完成
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span className="size-3 rounded border border-brand-300 bg-brand-50" aria-hidden="true" />
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
                "relative flex flex-col rounded-2xl border p-5 shadow-card",
                human ? "border-brand-300 bg-brand-50/70" : "border-ink-100 bg-white",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl",
                    human ? "bg-brand-gradient text-white shadow-glow" : "bg-ink-50 text-brand-600 ring-1 ring-ink-100",
                  )}
                >
                  <Icon name={step.icon} className="size-5" />
                </span>
                <span className={cn("text-xs font-semibold", human ? "text-brand-700" : "text-ink-400")}>
                  {String(index + 1).padStart(2, "0")} · {ACTOR_LABEL[step.actor]}
                </span>
              </div>
              <h3 className="mt-4 font-bold text-ink-900">{step.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{step.description}</p>
              {step.points && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {step.points.map((point) => (
                    <li
                      key={point}
                      className={cn(
                        "rounded-md px-2 py-0.5 text-xs",
                        human ? "bg-white text-brand-800 ring-1 ring-brand-200" : "bg-ink-50 text-ink-600",
                      )}
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              )}
              {index < steps.length - 1 && (
                <>
                  <ArrowRight
                    className="absolute -right-[1.15rem] top-9 z-10 hidden size-5 text-brand-400 lg:block"
                    aria-hidden="true"
                  />
                  <ArrowDown
                    className="absolute -bottom-[1.05rem] left-1/2 z-10 size-5 -translate-x-1/2 text-brand-400 sm:hidden"
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
          <div className="relative mx-[8.33%] hidden h-10 rounded-b-2xl border-x-2 border-b-2 border-dashed border-brand-300 lg:block" aria-hidden="true">
            <ArrowUp className="absolute -left-[0.7rem] -top-1 size-5 bg-white text-brand-400" />
          </div>
          <p className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-brand-700 lg:-mt-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-brand-200">
              <Icon name="repeat" className="size-4" />
              {loop}
            </span>
          </p>
        </>
      )}

      {guardrails && guardrails.length > 0 && (
        <div className="mt-10 rounded-3xl bg-night-gradient p-6 sm:p-8">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">全流程护栏</h3>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {guardrails.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white ring-1 ring-white/15">
                  <Icon name={item.icon ?? "shield"} className="size-4" />
                </span>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-300">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
