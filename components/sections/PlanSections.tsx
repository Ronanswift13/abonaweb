import { Ban, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { PlanStep, PlanTable, PlanTrack, SubPlan } from "@/types";

/**
 * 发展计划页（/directions/<slug>）的展示组件
 * 内容全部来自 data/plans.ts，组件只负责排版。
 */

/** 响应式表格：md 及以上为表格，移动端每行折叠为一张卡片 */
export function PlanTableView({ data, caption }: { data: PlanTable; caption?: string }) {
  return (
    <div className="bg-paper">
      <table className="hidden w-full text-left text-sm md:table">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-ink/5 text-ink">
          <tr>
            {data.columns.map((col) => (
              <th key={col} scope="col" className="px-5 py-3 font-bold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/15">
          {data.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="whitespace-nowrap px-5 py-4 align-top font-bold text-ink">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="px-5 py-4 align-top leading-relaxed text-ink">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="divide-y divide-ink/15 md:hidden">
        {data.rows.map((row) => (
          <li key={row[0]} className="p-5">
            <p className="font-bold text-ink">{row[0]}</p>
            <dl className="mt-2 space-y-1.5 text-sm">
              {row.slice(1).map((cell, i) => (
                <div key={i} className="flex gap-3">
                  <dt className="w-20 shrink-0 text-ink">{data.columns[i + 1]}</dt>
                  <dd className="text-ink">{cell}</dd>
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
          <span className="w-6 shrink-0 text-lg font-bold">{index + 1}</span>
          <div>
            <h4 className="font-bold text-ink">{step.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-ink">{step.description}</p>
            {step.note && <p className="mt-1 text-sm">{step.note}</p>}
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
        <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink">
          <Check className="mt-0.5 size-4 shrink-0 text-ink" aria-hidden="true" />
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
        "border-l-2 py-1 pl-5 text-sm leading-relaxed",
        tone === "brand" ? "border-red text-ink" : "border-ink/15 text-ink",
      )}
    >
      {children}
    </p>
  );
}

/** 技术线卡片；wide 时通栏展示，模块以网格排列 */
export function TrackCard({ track }: { track: PlanTrack }) {
  return (
    <article
      id={`track-${track.id}`}
      className={cn("bg-paper p-7 sm:p-8", track.wide && "lg:col-span-2")}
    >
      <h3 className="text-xl font-bold text-ink">{track.title}</h3>
      <p className="text-sm text-ink">{track.subtitle}</p>
      <p className="mt-5 leading-relaxed text-ink">{track.goal}</p>

      {track.layers && (
        <ul className="mt-6 space-y-2.5">
          {track.layers.map((layer) => (
            <li key={layer.title} className="border-l-2 border-ink/15 py-1 pl-4">
              <div>
                <p className="text-sm font-bold text-ink">{layer.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink">{layer.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {track.wide ? (
        <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
          {track.steps.map((step) => (
            <li key={step.title} className="border-t border-ink/15 py-4">
              <h4 className="font-bold text-ink">{step.title}</h4>
              <p className="mt-1.5 text-sm text-ink">{step.description}</p>
              {step.note && (
                <p className="mt-3 border-t border-ink/15 pt-3 text-sm">策略：{step.note}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <StepList steps={track.steps} className="mt-6" />
      )}

      <div className="mt-6 border-t border-ink/15 pt-5">
        <h4 className="text-sm font-bold text-ink">推进策略</h4>
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
        <div className="bg-paper p-7">
          <h3 className="font-bold text-ink">目标</h3>
          <CheckList items={plan.goals} className="mt-4" />
        </div>
        <div className="bg-paper p-7">
          <h3 className="font-bold text-ink">非目标</h3>
          <ul className="mt-4 space-y-2.5">
            {plan.nonGoals.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                <Ban className="mt-0.5 size-4 shrink-0 text-ink" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-bold text-ink">{plan.table.title}</h3>
        <PlanTableView data={plan.table.data} caption={`${plan.name}${plan.table.title}`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="bg-paper p-7 lg:col-span-5">
          <h3 className="text-lg font-bold text-ink">{plan.route.title}</h3>
          <StepList steps={plan.route.steps} className="mt-6" />
        </div>
        <div className="space-y-6 lg:col-span-7">
          {plan.highlights.map((block) => {
            const short = block.items.every((item) => item.length <= 14);
            return (
              <div key={block.title} className="bg-paper p-7">
                <h3 className="font-bold text-ink">{block.title}</h3>
                {short ? (
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                    {block.items.map((item) => (
                      <li key={item} className="text-sm text-ink">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <CheckList items={block.items} className="mt-4" />
                )}
                {block.note && <p className="mt-3 text-sm text-ink">{block.note}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {plan.zones && (
        <div>
          <h3 className="text-lg font-bold text-ink">{plan.zones.title}</h3>
          <p className="mb-4 mt-2 text-sm leading-relaxed text-ink">{plan.zones.description}</p>
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
    <ol className="border-b border-ink/15">
      {steps.map((step) => {
        const match = step.days.match(/(\d+)\D+(\d+)/);
        const start = match ? Number(match[1]) : 1;
        const end = match ? Number(match[2]) : totalDays;
        return (
          <li key={step.days} className="grid gap-2 border-t border-ink/15 py-4 sm:grid-cols-12 sm:items-center sm:gap-4">
            <p className="text-sm font-bold sm:col-span-2">{step.days}</p>
            <p className="text-sm leading-relaxed text-ink sm:col-span-6">{step.content}</p>
            <div className="relative h-2 bg-ink/10 sm:col-span-4" aria-hidden="true">
              <span
                className="absolute inset-y-0 bg-ink"
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
