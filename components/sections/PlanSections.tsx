import Link from "next/link";
import { Ban, Check, ChevronRight, Info } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { cn } from "@/lib/utils";
import type { DevelopmentPlan, PlanStep, PlanTable, PlanTrack, SubPlan } from "@/types";

/**
 * 发展计划页（/directions/<slug>）的展示组件
 * 内容全部来自 data/plans.ts，组件只负责排版。
 */

/** 响应式表格：md 及以上为表格，移动端每行折叠为一张卡片 */
export function PlanTableView({ data, caption }: { data: PlanTable; caption?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
      <table className="hidden w-full text-left text-sm md:table">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-ink-50 text-ink-500">
          <tr>
            {data.columns.map((col) => (
              <th key={col} scope="col" className="px-5 py-3 font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {data.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="whitespace-nowrap px-5 py-4 align-top font-semibold text-ink-900">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="px-5 py-4 align-top leading-relaxed text-ink-600">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="divide-y divide-ink-100 md:hidden">
        {data.rows.map((row) => (
          <li key={row[0]} className="p-5">
            <p className="font-semibold text-ink-900">{row[0]}</p>
            <dl className="mt-2 space-y-1.5 text-sm">
              {row.slice(1).map((cell, i) => (
                <div key={i} className="flex gap-3">
                  <dt className="w-20 shrink-0 text-ink-400">{data.columns[i + 1]}</dt>
                  <dd className="text-ink-700">{cell}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 编号步骤列表 */
export function StepList({ steps, className }: { steps: PlanStep[]; className?: string }) {
  return (
    <ol className={cn("space-y-5", className)}>
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
            {index + 1}
          </span>
          <div>
            <h4 className="font-semibold text-ink-900">{step.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-ink-500">{step.description}</p>
            {step.note && <p className="mt-1 text-xs text-brand-700">{step.note}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** 带对勾的要点列表 */
export function CheckList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-600">
          <Check className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** 提示框 */
export function Callout({ children, tone = "brand" }: { children: React.ReactNode; tone?: "brand" | "ink" }) {
  return (
    <p
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-5 text-sm leading-relaxed",
        tone === "brand" ? "border-brand-100 bg-brand-50/50 text-ink-700" : "border-ink-100 bg-ink-50 text-ink-600",
      )}
    >
      <Info className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

/** 技术线卡片；wide 时通栏展示，模块以网格排列 */
export function TrackCard({ track }: { track: PlanTrack }) {
  return (
    <article
      id={`track-${track.id}`}
      className={cn("rounded-3xl border border-ink-100 bg-white p-7 shadow-card sm:p-8", track.wide && "lg:col-span-2")}
    >
      <div className="flex items-center gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow">
          <Icon name={track.icon} className="size-6" />
        </span>
        <div>
          <h3 className="text-xl font-bold text-ink-900">{track.title}</h3>
          <p className="text-sm text-ink-500">{track.subtitle}</p>
        </div>
      </div>
      <p className="mt-5 leading-relaxed text-ink-600">{track.goal}</p>

      {track.layers && (
        <ul className="mt-6 space-y-2.5">
          {track.layers.map((layer) => (
            <li key={layer.title} className="flex gap-3 rounded-2xl bg-ink-50 p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 ring-1 ring-ink-100">
                <Icon name={layer.icon ?? track.icon} className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-900">{layer.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">{layer.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {track.wide ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {track.steps.map((step) => (
            <li key={step.title} className="rounded-2xl border border-ink-100 p-5">
              <h4 className="font-semibold text-ink-900">{step.title}</h4>
              <p className="mt-1.5 text-sm text-ink-500">{step.description}</p>
              {step.note && (
                <p className="mt-3 border-t border-ink-100 pt-3 text-xs text-brand-700">策略：{step.note}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <StepList steps={track.steps} className="mt-6" />
      )}

      <div className="mt-6 border-t border-ink-100 pt-5">
        <h4 className="text-sm font-semibold text-ink-900">推进策略</h4>
        <CheckList items={track.strategy} className="mt-3" />
      </div>
    </article>
  );
}

/** 分计划详情 */
export function SubPlanPanel({ plan }: { plan: SubPlan }) {
  return (
    <div className="mt-12 space-y-10">
      {/* 目标 / 非目标 */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-ink-100 bg-white p-7 shadow-card">
          <h3 className="font-bold text-ink-900">目标</h3>
          <CheckList items={plan.goals} className="mt-4" />
        </div>
        <div className="rounded-3xl border border-ink-100 bg-white p-7 shadow-card">
          <h3 className="font-bold text-ink-900">非目标</h3>
          <ul className="mt-4 space-y-2.5">
            {plan.nonGoals.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink-500">
                <Ban className="mt-0.5 size-4 shrink-0 text-ink-400" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-bold text-ink-900">{plan.table.title}</h3>
        <PlanTableView data={plan.table.data} caption={`${plan.name}${plan.table.title}`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="rounded-3xl border border-ink-100 bg-white p-7 shadow-card lg:col-span-5">
          <h3 className="text-lg font-bold text-ink-900">{plan.route.title}</h3>
          <StepList steps={plan.route.steps} className="mt-6" />
        </div>
        <div className="space-y-6 lg:col-span-7">
          {plan.highlights.map((block) => {
            const short = block.items.every((item) => item.length <= 14);
            return (
              <div key={block.title} className="rounded-3xl border border-ink-100 bg-white p-7 shadow-card">
                <h3 className="font-bold text-ink-900">{block.title}</h3>
                {short ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-brand-100 bg-brand-50/60 px-3 py-1 text-sm text-brand-800"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <CheckList items={block.items} className="mt-4" />
                )}
                {block.note && <p className="mt-3 text-xs text-ink-400">{block.note}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {plan.zones && (
        <div>
          <h3 className="text-lg font-bold text-ink-900">{plan.zones.title}</h3>
          <p className="mb-4 mt-2 text-sm leading-relaxed text-ink-500">{plan.zones.description}</p>
          <PlanTableView data={plan.zones.data} caption={plan.zones.title} />
        </div>
      )}

      {plan.note && <Callout>{plan.note}</Callout>}
    </div>
  );
}

/** 第一阶段 180 天甘特条：从“第 a–b 天”解析起止 */
export function PhaseGantt({ steps, totalDays = 180 }: { steps: { days: string; content: string }[]; totalDays?: number }) {
  return (
    <ol className="space-y-3">
      {steps.map((step) => {
        const match = step.days.match(/(\d+)\D+(\d+)/);
        const start = match ? Number(match[1]) : 1;
        const end = match ? Number(match[2]) : totalDays;
        return (
          <li key={step.days} className="grid gap-2 rounded-2xl border border-ink-100 bg-white p-4 shadow-card sm:grid-cols-12 sm:items-center sm:gap-4">
            <p className="text-sm font-semibold text-brand-700 sm:col-span-2">{step.days}</p>
            <p className="text-sm leading-relaxed text-ink-600 sm:col-span-6">{step.content}</p>
            <div className="relative h-2.5 rounded-full bg-ink-100 sm:col-span-4" aria-hidden="true">
              <span
                className="absolute inset-y-0 rounded-full bg-brand-gradient"
                style={{
                  left: `${((start - 1) / totalDays) * 100}%`,
                  width: `${((end - start + 1) / totalDays) * 100}%`,
                }}
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** 计划推荐位（首页、发展方向页） */
export function PlanSpotlight({ plan }: { plan: DevelopmentPlan }) {
  const href = `/directions/${plan.slug}`;
  return (
    <article className="grid overflow-hidden rounded-[2rem] border border-brand-100 bg-white shadow-card lg:grid-cols-12">
      <div className="relative p-8 sm:p-10 lg:col-span-7">
        <div
          className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-brand-100/60 blur-3xl"
          aria-hidden="true"
        />
        <p className="relative inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
          <span className="h-px w-6 bg-current" aria-hidden="true" />
          <span className="hidden sm:inline">Development Plan · </span>公司发展计划
        </p>
        <h2 className="relative mt-4 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">{plan.name}</h2>
        <p className="relative mt-2 font-semibold text-brand-700">{plan.subtitle}</p>
        <p className="relative mt-5 leading-relaxed text-ink-600">{plan.statement}</p>
        <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={href} arrow>
            了解计划详情
          </ButtonLink>
          <ButtonLink href={`${href}#roadmap`} variant="secondary">
            查看推进布局
          </ButtonLink>
        </div>
      </div>

      <div className="relative isolate bg-night-gradient p-8 text-white sm:p-10 lg:col-span-5">
        <div className="absolute inset-0 -z-10 bg-grid-dark bg-grid opacity-50" aria-hidden="true" />
        <ul className="space-y-4">
          {plan.subPlans.map((sub) => (
            <li key={sub.id}>
              <Link
                href={`${href}#${sub.id}`}
                className="group block rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition-colors hover:border-brand-300/50 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200"
              >
                <span className="flex items-center gap-2 font-semibold">
                  <Icon name={sub.icon} className="size-5 text-brand-200" />
                  {sub.name}
                  <span className="ml-auto rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-normal text-white/80">
                    {sub.domain}
                  </span>
                  <ChevronRight
                    className="size-4 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-white/70">{sub.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ol className="mt-6 grid grid-cols-3 gap-2 text-center">
          {plan.phases.map((phase, index) => (
            <li key={phase.name} className="rounded-xl bg-white/[0.06] px-2 py-3">
              <p className="text-xs text-white/60">0{index + 1}</p>
              <p className="mt-0.5 font-semibold">{phase.name}</p>
              <p className="mt-1 text-[11px] leading-snug text-white/60">{phase.period.replace(/ /g, "")}</p>
            </li>
          ))}
        </ol>
        <Link
          href={`${href}#interfaces`}
          className="group mt-6 inline-flex items-center gap-1.5 text-sm text-brand-200 transition-colors hover:text-white"
        >
          {plan.interfaces.items.map((item) => item.title).join(" · ")}
          <LinkArrow />
        </Link>
      </div>
    </article>
  );
}
