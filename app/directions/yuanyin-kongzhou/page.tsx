import Link from "next/link";
import { Ban, ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/sections/PageHeader";
import {
  Callout,
  CheckList,
  PhaseGantt,
  PlanTableView,
  SubPlanPanel,
  TrackCard,
} from "@/components/sections/PlanSections";
import { SectionNav, type SectionNavItem } from "@/components/ui/SectionNav";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { InlineList } from "@/components/ui/InlineList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { directionsIntro } from "@/data/directions";
import { yuanyinPlan as plan } from "@/data/plans";
import { pageMetadata } from "@/lib/metadata";

const path = `/directions/${plan.slug}`;

export const metadata = pageMetadata({ title: plan.name, description: plan.summary, path });

const [kongzhou, yuanyin] = plan.subPlans;

/** 页内导航（顺序与下方区块一致） */
const sectionNav: SectionNavItem[] = [
  { id: "overview", label: "计划概述" },
  { id: "naming", label: "计划释义" },
  { id: "tracks", label: "三条技术线" },
  { id: kongzhou.id, label: kongzhou.name },
  { id: yuanyin.id, label: yuanyin.name },
  { id: "fusion", label: "双图融合" },
  { id: "roadmap", label: "推进布局" },
  { id: "policy", label: "政策衔接" },
  { id: "acceptance", label: "验收与风控" },
  { id: "outcomes", label: "预期成果" },
];

/**
 * 元隐空轴智慧测绘计划 —— 公司发展计划详情页
 * 内容见 data/plans.ts；首页与 /directions 的推荐位链接到此页。
 */
export default function YuanyinKongzhouPage() {
  return (
    <>
      <PageHeader
        title={plan.name}
        description={plan.statement}
        breadcrumbs={[
          { label: directionsIntro.title, href: "/directions" },
          { label: plan.name, href: path },
        ]}
      >
        <p className="mt-3 text-lg font-bold">{plan.subtitle}</p>

        <dl className="mt-10 grid max-w-4xl gap-2">
          {plan.facts.map((fact) => (
            <div key={fact.label} className="grid gap-1 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
              <dt className="font-bold">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact#solution" variant="onDark">
            看合作流程
          </ButtonLink>
          <ButtonLink href="#roadmap" variant="onDark">
            看推进布局
          </ButtonLink>
        </div>
      </PageHeader>

      <SectionNav items={sectionNav} />

      {/* 计划概述 */}
      <section id="overview" className="bg-paper py-20">
        <Container>
          <SectionHeading title="计划概述" description={plan.summary} />
          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h3 className="text-lg font-bold text-ink">要解决的工程问题</h3>
              {plan.overview.problem.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-ink">
                  {p}
                </p>
              ))}
            </div>
            <div className="space-y-4 lg:col-span-7">
              {plan.overview.gaps.map((gap) => (
                <article key={gap.title} className="border-t border-ink/15 pt-4">
                  <div>
                    <h4 className="font-bold text-ink">{gap.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink">{gap.description}</p>
                  </div>
                </article>
              ))}
              <Callout>{plan.overview.conclusion}</Callout>
            </div>
          </div>

          <h3 className="mt-16 text-lg font-bold text-ink">总体目标</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {plan.overview.goals.map((goal) => (
              <article key={goal.year} className="border-t border-ink/15 pt-5">
                <p className="font-display text-5xl font-black">{goal.year}</p>
                <p className="mt-4 leading-relaxed text-ink">{goal.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 计划释义 */}
      <section id="naming" className="bg-paper py-20">
        <Container>
          <SectionHeading
            title="计划释义"
            description="对同一能源与交通基础设施对象做两类测绘——空天地物理测绘与网络空间资产测绘，再用主动智能体维持测绘结果的时效。"
          />
          <ul className="mt-12 grid gap-x-12 md:grid-cols-2">
            {plan.terms.map((term) => (
              <li key={term.term} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-5 border-t border-ink/15 py-6">
                <span className="font-display text-4xl font-black">{term.term}</span>
                <div>
                  <p className="text-sm text-ink">{term.group}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink">{term.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 三条技术线 */}
      <section id="tracks" className="bg-paper py-20">
        <Container>
          <SectionHeading
            title="三条技术线"
            description="物理空间、网络空间与主动智能体并行研发，最终在统一的对象编号上汇合。"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {plan.tracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
          <div className="bg-ink mt-6 flex flex-col gap-4 p-7 text-paper xl:flex-row xl:items-center">
            <span className="shrink-0 font-bold">
              大模型在运行时中的角色限定为
            </span>
            <InlineList items={plan.llmRoles} className="text-[15px]" />
            <span className="text-sm text-paper xl:ml-auto">不替代电力调度，不替代安全防护设备</span>
          </div>
        </Container>
      </section>

      {/* 两个分计划 */}
      {[kongzhou, yuanyin].map((sub) => (
        <section key={sub.id} id={sub.id} className="bg-paper py-20">
          <Container>
            <div>
              <SectionHeading
                title={sub.name}
                description={sub.summary}
              />
            </div>
            <SubPlanPanel plan={sub} />
          </Container>
        </section>
      ))}

      {/* 双图融合 */}
      <section id="fusion" className="bg-paper py-20">
        <Container>
          <SectionHeading title="双图融合与大模型用法" description={plan.fusion.unit} />

          <h3 className="mt-12 text-lg font-bold text-ink">大模型调用链</h3>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {plan.fusion.chain.map((step, index) => {
              const last = index === plan.fusion.chain.length - 1;
              return (
                <li
                  key={step}
                  className={
                    last ? "bg-ink relative p-5 text-paper" : "relative bg-paper p-5"
                  }
                >
                  <p className={last ? "font-bold" : "font-bold text-ink"}>{step}</p>
                  {!last && (
                    <ChevronRight
                      className="absolute -right-3 top-1/2 z-10 hidden size-5 -translate-y-1/2 bg-paper text-red lg:block"
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ol>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Callout>{plan.fusion.wording}</Callout>
            </div>
            <div className="border border-ink/15 bg-paper p-7 lg:col-span-7">
              <h3 className="font-bold text-ink">模型治理</h3>
              <CheckList items={plan.fusion.governance} className="mt-4" />
            </div>
          </div>
        </Container>
      </section>

      {/* 推进布局 */}
      <section id="roadmap" className="bg-paper py-20">
        <Container>
          <SectionHeading
            title="推进布局"
            description="三个阶段与国家政策窗口对齐：先在单站验证，再复制到多个场站，最后扩展到主配微、交通与算力节点。"
          />
          <ol className="mt-12 border-b border-ink/15">
            {plan.phases.map((phase) => (
              <li key={phase.name} className="grid gap-3 border-t border-ink/15 py-7 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-3">
                  <h3 className="font-display text-3xl font-black text-ink">{phase.name}</h3>
                  <p className="mt-2 text-sm font-bold">{phase.period}</p>
                </div>
                <p className="leading-relaxed text-ink lg:col-span-6">{phase.content}</p>
                <p className="text-sm leading-relaxed text-ink lg:col-span-3">对应国家窗口：{phase.window}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-16 text-lg font-bold text-ink">第一阶段操作顺序</h3>
          <p className="mb-6 mt-2 text-sm text-ink">{plan.firstPhase.intro}</p>
          <PhaseGantt steps={plan.firstPhase.steps} />

          <div id="interfaces" className="mt-16">
            <h3 className="text-lg font-bold text-ink">行业方向与接口</h3>
            <p className="mb-6 mt-2 text-sm text-ink">{plan.interfaces.intro}</p>
            <ul className="grid gap-x-12 sm:grid-cols-2">
              {plan.interfaces.items.map((item) => (
                <li key={item.title} className="border-t border-ink/15 py-5">
                  <h4 className="font-bold text-ink">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 政策衔接 */}
      <section id="policy" className="bg-paper py-20">
        <Container>
          <SectionHeading
            title="国家战略衔接"
            description="计划承接“人工智能+”行动、新型电力系统建设与电力监控安全防护等政策要求；只读、分区和工单定位与政策文件一致，不改变调度管辖或安全分区原则。"
          />
          <div className="mt-12">
            <PlanTableView data={plan.policies} caption="政策文件与本计划的对应关系" />
          </div>
        </Container>
      </section>

      {/* 验收与风控 */}
      <section id="acceptance" className="bg-paper py-20">
        <Container>
          <SectionHeading
            title="验收与风险控制"
            description="以连续班次的现场记录为据验收，越权动作与穿区通道必须为零。"
          />
          <h3 className="mb-4 mt-12 text-lg font-bold text-ink">第一阶段验收指标</h3>
          <PlanTableView data={plan.acceptance} caption="第一阶段验收指标" />
          <h3 className="mb-4 mt-12 text-lg font-bold text-ink">风险与控制</h3>
          <PlanTableView data={plan.risks} caption="风险与控制措施" />
        </Container>
      </section>

      {/* 预期成果与边界 */}
      <section id="outcomes" className="bg-paper py-20">
        <Container>
          <SectionHeading
            title="预期成果"
            description="成果用于新能源系统的主动运维和关键信息基础设施的资产可见性。"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            <ol className="space-y-4 lg:col-span-7">
              {plan.outcomes.map((item, index) => (
                <li key={item} className="flex gap-4 border-t border-ink/15 pt-4">
                  <span className="w-6 shrink-0 text-lg font-bold">{index + 1}</span>
                  <p className="leading-relaxed text-ink">{item}</p>
                </li>
              ))}
            </ol>
            <div className="bg-ink p-7 text-paper lg:col-span-5">
              <h3 className="text-lg font-bold">规划期内明确不做</h3>
              <ul className="mt-5 space-y-3">
                {plan.boundaries.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-paper">
                    <Ban className="mt-0.5 size-4 shrink-0 text-paper" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="mt-16 text-lg font-bold text-ink">依托的技术基础</h3>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {plan.foundations.map((item) => (
              <li key={item.href}>
                {/* 悬停上浮只作用于内层，链接点击区域保持不动 */}
                <Link
                  href={item.href}
                  className="group block h-full"
                >
                  <span className="flex h-full flex-col bg-paper p-6 transition-shadow duration-200 group-hover:">
                    <h4 className="font-bold text-ink">{item.title}</h4>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-ink">{item.description}</span>
                    <span className="mt-3 text-[15px] font-bold text-red underline underline-offset-4">看这个产品</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

    </>
  );
}
