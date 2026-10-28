import { Info } from "lucide-react";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type {
  ArchitectureLayer,
  Feature,
  IconName,
  MonitoringPlugin,
  PluginGroup,
  PluginScene,
  ProductStat,
  TechStackGroup,
} from "@/types";

/**
 * 产品详情页的技术方案区块（/products/[slug]）
 * 均为纯展示组件，数据来自 data/products.ts 中对应产品的可选字段。
 */

/** 关键数据条（页头内） */
export function ProductStats({ stats, note }: { stats: ProductStat[]; note?: string }) {
  return (
    <div className="mt-10">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-100 bg-ink-100 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse justify-end bg-white px-5 py-5">
            <dt className="mt-1 text-sm text-ink-500">{stat.label}</dt>
            <dd className="text-gradient text-2xl font-bold sm:text-3xl">{stat.value}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="mt-3 text-xs leading-relaxed text-ink-400">注：{note}</p>}
    </div>
  );
}

/** 页内锚点导航（页头内） */
export function ProductSectionNav({ items }: { items: { id: string; label: string; icon: IconName }[] }) {
  return (
    <nav aria-label="页内导航" className="mt-8">
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              <Icon name={item.icon} className="size-4 text-brand-600" />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** 图标 + 标题 + 描述的卡片网格（核心功能 / 关键技术 / 安全设计共用） */
export function FeatureGrid({
  items,
  fallbackIcon,
  columns = 2,
}: {
  items: Feature[];
  fallbackIcon: IconName;
  columns?: 2 | 3;
}) {
  return (
    <div className={cn("mt-12 grid gap-6 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
      {items.map((item) => (
        <article
          key={item.title}
          className={cn(
            "rounded-3xl border border-ink-100 bg-white shadow-card",
            columns === 2 ? "flex gap-5 p-7" : "p-7",
          )}
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient-soft text-brand-600 ring-1 ring-brand-100">
            <Icon name={item.icon ?? fallbackIcon} className="size-6" />
          </span>
          <div className={cn(columns === 3 && "mt-5")}>
            <h3 className="text-lg font-bold text-ink-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

/** 分层架构图：自上而下逐层排列 */
export function ArchitectureStack({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <ol className="mt-12 space-y-3">
      {layers.map((layer, index) => (
        <li
          key={layer.name}
          className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card lg:grid lg:grid-cols-12 lg:items-center lg:gap-6"
        >
          <div className="flex items-center gap-4 lg:col-span-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-sm font-bold text-white shadow-glow">
              L{layers.length - index}
            </span>
            <div>
              <h3 className="font-bold text-ink-900">{layer.name}</h3>
              <p className="text-xs text-ink-500">{layer.description}</p>
            </div>
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:col-span-9 lg:mt-0 lg:grid-cols-4">
            {layer.items.map((item) => (
              <li key={item} className="rounded-xl bg-ink-50 px-3 py-2.5 text-sm text-ink-700">
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

/** 部署场景的展示顺序；矩阵只显示至少有一个插件的场景 */
const SCENE_ORDER: PluginScene[] = ["室外", "室内", "移动作业", "二次设备", "全站"];

/** 四类插件的色阶（A 最深 → D 最浅），总览条与矩阵行标共用 */
const GROUP_TONES = ["bg-brand-800", "bg-brand-600", "bg-brand-400", "bg-ink-400"];

function PluginChip({ plugin }: { plugin: MonitoringPlugin }) {
  return (
    <a
      href={`#plugin-${plugin.id}`}
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-ink-100 bg-white px-2.5 py-1.5 text-xs font-medium text-ink-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
    >
      <Icon name={plugin.icon} className="size-3.5 text-brand-600" />
      {plugin.name}
    </a>
  );
}

/** 插件矩阵总览：类别占比条 + 「系统类别 × 部署场景」矩阵，芯片点击跳到下方插件详情卡片 */
export function PluginOverview({ groups }: { groups: PluginGroup[] }) {
  const total = groups.reduce((sum, g) => sum + g.plugins.length, 0);
  const scenes = SCENE_ORDER.filter((scene) => groups.some((g) => g.plugins.some((p) => p.scene === scene)));
  const inScene = (group: PluginGroup, scene: PluginScene) => group.plugins.filter((p) => p.scene === scene);

  return (
    <div className="mt-12 rounded-3xl border border-ink-100 bg-white p-5 shadow-card sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-lg font-bold text-ink-900">插件矩阵总览</h3>
        <p className="text-sm text-ink-500">
          共 <span className="font-semibold text-ink-900">{total}</span> 个插件 · 点击插件查看详情
        </p>
      </div>

      {/* 类别占比 */}
      <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-ink-100" aria-hidden="true">
        {groups.map((group, i) => (
          <span
            key={group.code}
            className={cn("h-full border-r-2 border-white last:border-r-0", GROUP_TONES[i % GROUP_TONES.length])}
            style={{ width: `${(group.plugins.length / total) * 100}%` }}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-ink-500">
        {groups.map((group, i) => (
          <li key={group.code} className="inline-flex items-center gap-1.5">
            <span className={cn("size-2.5 rounded-sm", GROUP_TONES[i % GROUP_TONES.length])} aria-hidden="true" />
            {group.code} 类 · {group.title}
            <span className="font-semibold text-ink-800">{group.plugins.length}</span>
          </li>
        ))}
      </ul>

      {/* 大屏：类别 × 场景矩阵 */}
      <div className="mt-7 hidden overflow-x-auto lg:block">
        <table className="w-full border-separate border-spacing-0 text-left">
          <caption className="sr-only">监测插件按系统类别与部署场景分布</caption>
          <thead>
            <tr>
              <th scope="col" className="w-56 pb-3 text-xs font-semibold text-ink-400">
                系统类别 \ 部署场景
              </th>
              {scenes.map((scene) => (
                <th key={scene} scope="col" className="pb-3 pl-3 text-xs font-semibold text-ink-500">
                  {scene}
                  <span className="ml-1.5 font-normal text-ink-400">
                    {groups.reduce((sum, g) => sum + inScene(g, scene).length, 0)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((group, i) => (
              <tr key={group.code}>
                <th scope="row" className="border-t border-ink-100 py-4 pr-4 align-top">
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white",
                        GROUP_TONES[i % GROUP_TONES.length],
                      )}
                    >
                      {group.code}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-ink-900">{group.title}</span>
                      <span className="text-xs font-normal text-ink-400">{group.plugins.length} 个插件</span>
                    </span>
                  </span>
                </th>
                {scenes.map((scene) => {
                  const plugins = inScene(group, scene);
                  return (
                    <td
                      key={scene}
                      className={cn("border-t border-ink-100 py-4 pl-3 align-top", plugins.length > 0 && "bg-ink-50/60")}
                    >
                      {plugins.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {plugins.map((plugin) => (
                            <PluginChip key={plugin.id} plugin={plugin} />
                          ))}
                        </div>
                      ) : (
                        <span className="text-ink-200" aria-label="无">
                          —
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 小屏：按类别分组，再按场景列出 */}
      <div className="mt-6 space-y-5 lg:hidden">
        {groups.map((group, i) => (
          <div key={group.code} className="rounded-2xl bg-ink-50/70 p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-lg text-xs text-white",
                  GROUP_TONES[i % GROUP_TONES.length],
                )}
              >
                {group.code}
              </span>
              {group.title}
            </p>
            <dl className="mt-3 space-y-2.5">
              {scenes
                .filter((scene) => inScene(group, scene).length > 0)
                .map((scene) => (
                  <div key={scene}>
                    <dt className="text-xs text-ink-400">{scene}</dt>
                    <dd className="mt-1.5 flex flex-wrap gap-1.5">
                      {inScene(group, scene).map((plugin) => (
                        <PluginChip key={plugin.id} plugin={plugin} />
                      ))}
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 监测插件矩阵：按类别分组的插件卡片；每张卡片带锚点 #plugin-{id} */
export function PluginMatrix({ groups, note }: { groups: PluginGroup[]; note?: string }) {
  return (
    <div className="mt-12 space-y-14">
      {groups.map((group) => (
        <div key={group.code}>
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-xl font-bold text-white shadow-glow">
              {group.code}
            </span>
            <div>
              <h3 className="text-xl font-bold text-ink-900">
                {group.code} 类 · {group.title}
                <span className="ml-2 align-middle text-sm font-medium text-ink-400">{group.plugins.length} 个插件</span>
              </h3>
              <p className="mt-1 text-sm text-ink-500">{group.description}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {group.plugins.map((plugin) => (
              <article
                key={plugin.id}
                id={`plugin-${plugin.id}`}
                className="flex flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-shadow target:border-brand-300 target:shadow-card-hover hover:shadow-card-hover"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-600 ring-1 ring-brand-100">
                    <Icon name={plugin.icon} className="size-5" />
                  </span>
                  <span className="rounded-full bg-ink-50 px-2.5 py-1 text-xs text-ink-500">{plugin.scene}</span>
                </div>
                <h4 className="mt-4 text-base font-bold text-ink-900">{plugin.name}</h4>
                <p className="mt-0.5 font-mono text-[11px] text-ink-400">{plugin.id}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">{plugin.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {plugin.techniques.map((t) => (
                    <li key={t} className="rounded-md border border-brand-100 bg-brand-50/60 px-2 py-0.5 text-xs text-brand-800">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      ))}

      {note && (
        <p className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/50 p-5 text-sm leading-relaxed text-ink-600">
          <Info className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
          {note}
        </p>
      )}
    </div>
  );
}

/** 技术栈：类别 + 标签 */
export function TechStack({ groups }: { groups: TechStackGroup[] }) {
  return (
    <dl className="mt-12 divide-y divide-ink-100 overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card">
      {groups.map((group) => (
        <div key={group.category} className="grid gap-3 p-5 sm:grid-cols-12 sm:items-center sm:gap-6 sm:px-7">
          <dt className="text-sm font-semibold text-ink-900 sm:col-span-3">{group.category}</dt>
          <dd className="sm:col-span-9">
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded-full bg-ink-50 px-3 py-1 text-sm text-ink-700">
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
