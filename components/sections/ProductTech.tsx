import { Container } from "@/components/ui/Container";
import { InlineList } from "@/components/ui/InlineList";
import { cn } from "@/lib/utils";
import type {
  ArchitectureLayer,
  Feature,
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

/** 关键数据：放在阅读区开头，不进首屏 */
export function ProductStats({ stats, note }: { stats: ProductStat[]; note?: string }) {
  return (
    <section className="pt-20 sm:pt-24">
      <Container>
        <dl className="grid grid-cols-2 gap-x-10 gap-y-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 text-[15px] leading-snug">{stat.label}</dt>
              <dd className="text-5xl font-bold text-theme-heading lg:text-6xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
        {note && <p className="mt-6 max-w-[38em] text-[15px] leading-relaxed">注：{note}</p>}
      </Container>
    </section>
  );
}

/** 标题 + 说明的条目列表（核心功能 / 关键技术 / 安全设计共用） */
export function FeatureGrid({ items }: { items: Feature[] }) {
  return (
    <dl className="grid gap-10">
      {items.map((item) => (
        <div key={item.title}>
          <dt className="font-display text-2xl font-black leading-snug">{item.title}</dt>
          <dd className="mt-1.5 max-w-[36em]">{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}

/** 分层架构图：自上而下逐层排列 */
export function ArchitectureStack({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <ol className="mt-12 border-b border-theme-fg/15">
      {layers.map((layer, index) => (
        <li key={layer.name} className="border-t border-theme-fg/15 py-5 lg:grid lg:grid-cols-12 lg:items-baseline lg:gap-6">
          <div className="flex items-baseline gap-4 lg:col-span-4">
            <span className="w-7 shrink-0 text-sm font-bold text-theme-heading">L{layers.length - index}</span>
            <div>
              <h3 className="font-bold text-theme-fg">{layer.name}</h3>
              <p className="mt-0.5 text-sm text-theme-fg">{layer.description}</p>
            </div>
          </div>
          <ul className="ml-11 mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-theme-fg lg:col-span-8 lg:ml-0 lg:mt-0">
            {layer.items.map((item) => (
              <li key={item}>{item}</li>
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
const GROUP_TONES = ["bg-theme-accent", "bg-theme-accent/70", "bg-theme-accent/45", "bg-theme-accent/25"];

function PluginChip({ plugin }: { plugin: MonitoringPlugin }) {
  return (
    <a
      href={`#plugin-${plugin.id}`}
      className="inline-flex whitespace-nowrap border border-theme-fg/15 bg-theme-bg px-2 py-1 text-sm text-theme-fg transition-colors hover:border-theme-heading hover:text-theme-heading"
    >
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
    <div className="mt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-lg font-bold text-theme-fg">插件矩阵总览</h3>
        <p className="text-sm text-theme-fg">
          共 <span className="font-bold">{total}</span> 个插件，点击插件查看详情
        </p>
      </div>

      {/* 类别占比 */}
      <div className="mt-5 flex h-2 overflow-hidden bg-theme-fg/10" aria-hidden="true">
        {groups.map((group, i) => (
          <span
            key={group.code}
            className={cn("h-full border-r-2 border-theme-fg/15 last:border-r-0", GROUP_TONES[i % GROUP_TONES.length])}
            style={{ width: `${(group.plugins.length / total) * 100}%` }}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-theme-fg">
        {groups.map((group, i) => (
          <li key={group.code} className="inline-flex items-center gap-1.5">
            <span className={cn("size-2.5", GROUP_TONES[i % GROUP_TONES.length])} aria-hidden="true" />
            {group.code} 类 {group.title}
            <span className="font-bold">{group.plugins.length}</span>
          </li>
        ))}
      </ul>

      {/* 大屏：类别 × 场景矩阵 */}
      <div className="mt-7 hidden overflow-x-auto lg:block">
        <table className="w-full border-separate border-spacing-0 text-left">
          <caption className="sr-only">监测插件按系统类别与部署场景分布</caption>
          <thead>
            <tr>
              <th scope="col" className="w-56 pb-3 text-sm font-bold text-theme-fg">
                类别和场景
              </th>
              {scenes.map((scene) => (
                <th key={scene} scope="col" className="pb-3 pl-3 text-sm font-bold text-theme-fg">
                  {scene}
                  <span className="ml-1.5 font-normal text-theme-fg">
                    {groups.reduce((sum, g) => sum + inScene(g, scene).length, 0)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.code}>
                <th scope="row" className="border-t border-theme-fg/15 py-4 pr-4 align-top">
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center border border-theme-heading text-sm font-bold text-theme-heading",
                      )}
                    >
                      {group.code}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-theme-fg">{group.title}</span>
                      <span className="text-sm font-normal text-theme-fg">{group.plugins.length} 个插件</span>
                    </span>
                  </span>
                </th>
                {scenes.map((scene) => {
                  const plugins = inScene(group, scene);
                  return (
                    <td
                      key={scene}
                      className={cn("border-t border-theme-fg/15 py-4 pl-3 align-top", plugins.length > 0 && "bg-theme-fg/5")}
                    >
                      {plugins.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {plugins.map((plugin) => (
                            <PluginChip key={plugin.id} plugin={plugin} />
                          ))}
                        </div>
                      ) : (
                        <span className="text-theme-fg" aria-label="无">
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
        {groups.map((group) => (
          <div key={group.code} className="border-t border-theme-fg/15 pt-4">
            <p className="flex items-center gap-2 text-sm font-bold text-theme-fg">
              <span
                className={cn(
                  "flex size-7 items-center justify-center border border-theme-heading text-sm text-theme-heading",
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
                    <dt className="text-sm text-theme-fg">{scene}</dt>
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

/** 监测插件清单：按类别分组的规格表，一行一个插件；每行带锚点 #plugin-{id} */
export function PluginMatrix({ groups, note }: { groups: PluginGroup[]; note?: string }) {
  return (
    <div className="mt-14 space-y-12">
      {groups.map((group) => (
        <div key={group.code}>
          <h3 className="text-xl font-bold text-theme-fg">
            {group.code} 类 {group.title}
            <span className="ml-2 text-sm font-normal">{group.plugins.length} 个插件</span>
          </h3>
          <p className="mt-1 text-sm text-theme-fg">{group.description}</p>

          <div className="mt-5 border-b border-theme-fg/15">
            {group.plugins.map((plugin) => (
              <article
                key={plugin.id}
                id={`plugin-${plugin.id}`}
                className="grid gap-x-8 gap-y-2 border-t border-theme-fg/15 py-5 transition-colors target:bg-theme-fg/10 lg:grid-cols-12"
              >
                <div className="lg:col-span-3">
                  <h4 className="font-bold text-theme-fg">{plugin.name}</h4>
                  <p className="mt-0.5 text-sm">{plugin.scene}</p>
                </div>
                <p className="text-sm leading-relaxed text-theme-fg lg:col-span-5">{plugin.description}</p>
                <InlineList items={plugin.techniques} className="text-[15px] leading-relaxed lg:col-span-4" />
              </article>
            ))}
          </div>
        </div>
      ))}

      {note && <p className="max-w-3xl border-l-2 border-theme-heading pl-5 text-sm leading-relaxed text-theme-fg">{note}</p>}
    </div>
  );
}

/** 技术栈：类别 + 名称 */
export function TechStack({ groups }: { groups: TechStackGroup[] }) {
  return (
    <dl className="grid gap-6">
      {groups.map((group) => (
        <div key={group.category}>
          <dt className="font-bold">{group.category}</dt>
          <dd>
            <InlineList items={group.items} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
