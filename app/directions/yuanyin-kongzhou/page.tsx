import Link from "next/link";
import { Ban, ChevronRight } from "lucide-react";

import { CTA } from "@/components/sections/CTA";
import { PageHeader } from "@/components/sections/PageHeader";
import {
  Callout,
  CheckList,
  PhaseGantt,
  PlanTableView,
  SubPlanPanel,
  TrackCard,
} from "@/components/sections/PlanSections";
import { SectionNav } from "@/components/ui/SectionNav";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { directionsIntro } from "@/data/directions";
import { home } from "@/data/home";
import { yuanyinPlan as plan } from "@/data/plans";
import { pageMetadata } from "@/lib/metadata";
import type { IconName } from "@/types";

const path = `/directions/${plan.slug}`;

export const metadata = pageMetadata({ title: plan.name, description: plan.summary, path });

const [kongzhou, yuanyin] = plan.subPlans;

/** 页内导航（顺序与下方区块一致） */
const sectionNav: { id: string; label: string; icon: IconName }[] = [
  { id: "overview", label: "计划概述", icon: "target" },
  { id: "naming", label: "计划释义", icon: "compass" },
  { id: "tracks", label: "三条技术线", icon: "layers" },
  { id: kongzhou.id, label: kongzhou.name, icon: kongzhou.icon },
  { id: yuanyin.id, label: yuanyin.name, icon: yuanyin.icon },
  { id: "fusion", label: "双图融合", icon: "merge" },
  { id: "roadmap", label: "推进布局", icon: "route" },
  { id: "policy", label: "政策衔接", icon: "landmark" },
  { id: "acceptance", label: "验收与风控", icon: "checklist" },
  { id: "outcomes", label: "预期成果", icon: "flag" },
];

/**
 * 元隐空轴智慧测绘计划 —— 公司发展计划详情页
 * 内容见 data/plans.ts；首页与 /directions 的推荐位链接到此页。
 */
export default function YuanyinKongzhouPage() {
  return (
    <>
      <PageHeader
        eyebrow="DEVELOPMENT PLAN · 公司发展计划"
        title={plan.name}
        description={plan.statement}
        breadcrumbs={[
          { label: directionsIntro.title, href: "/directions" },
          { label: plan.name, href: path },
        ]}
      >
        <p className="mt-2 text-lg font-semibold text-brand-700">{plan.subtitle}</p>

        <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-ink-100 bg-ink-100 sm:grid-cols-2">
          {plan.facts.map((fact) => (
            <div key={fact.label} className="bg-white px-5 py-4">
              <dt className="text-xs font-semibold text-brand-700">{fact.label}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink-800">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact#solution" size="lg" arrow>
            洽谈合作
          </ButtonLink>
          <ButtonLink href="#roadmap" variant="secondary" size="lg">
            查看推进布局
          </ButtonLink>
        </div>
      </PageHeader>

      <SectionNav items={sectionNav} />

      {/* 计划概述 */}
      <section id="overview" className="py-20">
        <Container>
          <SectionHeading eyebrow="OVERVIEW" title="计划概述" description={plan.summary} />
          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h3 className="text-lg font-bold text-ink-900">要解决的工程问题</h3>
              {plan.overview.problem.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-ink-600">
                  {p}
                </p>
              ))}
            </div>
            <div className="space-y-4 lg:col-span-7">
              {plan.overview.gaps.map((gap) => (
                <article key={gap.title} className="flex gap-5 rounded-3xl border border-ink-100 bg-white p-6 shadow-card">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient-soft text-brand-600 ring-1 ring-brand-100">
                    <Icon name={gap.icon ?? "target"} className="size-6" />
                  </span>
                  <div>
                    <h4 className="font-bold text-ink-900">{gap.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{gap.description}</p>
                  </div>
                </article>
              ))}
              <Callout>{plan.overview.conclusion}</Callout>
            </div>
          </div>

          <h3 className="mt-16 text-lg font-bold text-ink-900">总体目标</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {plan.overview.goals.map((goal) => (
              <article key={goal.year} className="rounded-3xl border border-ink-100 bg-white p-7 shadow-card">
                <p className="text-gradient text-4xl font-extrabold">{goal.year}</p>
                <p className="mt-4 leading-relaxed text-ink-600">{goal.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 计划释义 */}
      <section id="naming" className="bg-ink-50/70 py-20">
        <Container>
          <SectionHeading
            eyebrow="NAMING"
            title="计划释义"
            description="对同一能源与交通基础设施对象做两类测绘——空天地物理测绘与网络空间资产测绘，再用主动智能体维持测绘结果的时效。"
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plan.terms.map((term) => (
              <li key={term.term} className="rounded-3xl border border-ink-100 bg-white p-7 shadow-card">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-gradient text-4xl font-extrabold">{term.term}</span>
                  <span className="rounded-full bg-ink-50 px-2.5 py-1 text-xs text-ink-500">{term.group}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-600">{term.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 三条技术线 */}
      <section id="tracks" className="py-20">
        <Container>
          <SectionHeading
            eyebrow="TECH LINES"
            title="三条技术线"
            description="物理空间、网络空间与主动智能体并行研发，最终在统一的对象编号上汇合。"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {plan.tracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-4 rounded-3xl bg-night-gradient p-7 text-white xl:flex-row xl:items-center">
            <span className="flex shrink-0 items-center gap-3 font-semibold">
              <Icon name="brain" className="size-6 text-brand-200" />
              大模型在运行时中的角色限定为
            </span>
            <ul className="flex flex-wrap gap-2">
              {plan.llmRoles.map((role) => (
                <li key={role} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm">
                  {role}
                </li>
              ))}
            </ul>
            <span className="text-sm text-white/60 xl:ml-auto">不替代电力调度，不替代安全防护设备</span>
          </div>
        </Container>
      </section>

      {/* 两个分计划 */}
      {[kongzhou, yuanyin].map((sub, index) => (
        <section key={sub.id} id={sub.id} className={index === 0 ? "bg-ink-50/70 py-20" : "py-20"}>
          <Container>
            <div className="flex items-start gap-5">
              <span className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow sm:flex">
                <Icon name={sub.icon} className="size-7" />
              </span>
              <SectionHeading
                eyebrow={`SUB-PLAN 0${index + 1} · ${sub.domain}`}
                title={sub.name}
                description={sub.summary}
              />
            </div>
            <SubPlanPanel plan={sub} />
          </Container>
        </section>
      ))}

      {/* 双图融合 */}
      <section id="fusion" className="bg-ink-50/70 py-20">
        <Container>
          <SectionHeading eyebrow="DUAL-MAP FUSION" title="双图融合与大模型用法" description={plan.fusion.unit} />

          <h3 className="mt-12 text-lg font-bold text-ink-900">大模型调用链</h3>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {plan.fusion.chain.map((step, index) => {
              const last = index === plan.fusion.chain.length - 1;
              return (
                <li
                  key={step}
                  className={
                    last
                      ? "relative rounded-2xl bg-brand-gradient p-5 text-white shadow-glow"
                      : "relative rounded-2xl border border-ink-100 bg-white p-5 shadow-card"
                  }
                >
                  <span className={last ? "text-sm font-bold text-white/70" : "text-gradient text-sm font-bold"}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className={last ? "mt-2 font-semibold" : "mt-2 font-semibold text-ink-900"}>{step}</p>
                  {!last && (
                    <ChevronRight
                      className="absolute -right-3 top-1/2 z-10 hidden size-5 -translate-y-1/2 rounded-full bg-white text-brand-600 shadow-card lg:block"
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
            <div className="rounded-3xl border border-ink-100 bg-white p-7 shadow-card lg:col-span-7">
              <h3 className="font-bold text-ink-900">模型治理</h3>
              <CheckList items={plan.fusion.governance} className="mt-4" />
            </div>
          </div>
        </Container>
      </section>

      {/* 推进布局 */}
      <section id="roadmap" className="py-20">
        <Container>
          <SectionHeading
            eyebrow="ROADMAP"
            title="推进布局"
            description="三个阶段与国家政策窗口对齐：先在单站验证，再复制到多个场站，最后扩展到主配微、交通与算力节点。"
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {plan.phases.map((phase, index) => (
              <li key={phase.name} className="relative rounded-3xl border border-ink-100 bg-white p-7 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white shadow-glow">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-bold text-ink-900">{phase.name}</h3>
                </div>
                <p className="mt-4 text-sm font-semibold text-brand-700">{phase.period}</p>
                <p className="mt-2 leading-relaxed text-ink-700">{phase.content}</p>
                <p className="mt-4 border-t border-ink-100 pt-4 text-xs leading-relaxed text-ink-400">
                  对应国家窗口：{phase.window}
                </p>
              </li>
            ))}
          </ol>

          <h3 className="mt-16 text-lg font-bold text-ink-900">第一阶段操作顺序</h3>
          <p className="mb-6 mt-2 text-sm text-ink-500">{plan.firstPhase.intro}</p>
          <PhaseGantt steps={plan.firstPhase.steps} />

          <div id="interfaces" className="mt-16">
            <h3 className="text-lg font-bold text-ink-900">行业方向与接口</h3>
            <p className="mb-6 mt-2 text-sm text-ink-500">{plan.interfaces.intro}</p>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {plan.interfaces.items.map((item) => (
                <li key={item.title} className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-600 ring-1 ring-brand-100">
                    <Icon name={item.icon ?? "globe"} className="size-5" />
                  </span>
                  <h4 className="mt-4 font-bold text-ink-900">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 政策衔接 */}
      <section id="policy" className="bg-ink-50/70 py-20">
        <Container>
          <SectionHeading
            eyebrow="POLICY ALIGNMENT"
            title="国家战略衔接"
            description="计划承接“人工智能+”行动、新型电力系统建设与电力监控安全防护等政策要求；只读、分区和工单定位与政策文件一致，不改变调度管辖或安全分区原则。"
          />
          <div className="mt-12">
            <PlanTableView data={plan.policies} caption="政策文件与本计划的对应关系" />
          </div>
        </Container>
      </section>

      {/* 验收与风控 */}
      <section id="acceptance" className="py-20">
        <Container>
          <SectionHeading
            eyebrow="ACCEPTANCE & RISK"
            title="验收与风险控制"
            description="以连续班次的现场记录为据验收，越权动作与穿区通道必须为零。"
          />
          <h3 className="mb-4 mt-12 text-lg font-bold text-ink-900">第一阶段验收指标</h3>
          <PlanTableView data={plan.acceptance} caption="第一阶段验收指标" />
          <h3 className="mb-4 mt-12 text-lg font-bold text-ink-900">风险与控制</h3>
          <PlanTableView data={plan.risks} caption="风险与控制措施" />
        </Container>
      </section>

      {/* 预期成果与边界 */}
      <section id="outcomes" className="bg-ink-50/70 py-20">
        <Container>
          <SectionHeading
            eyebrow="DELIVERABLES"
            title="预期成果"
            description="成果用于新能源系统的主动运维和关键信息基础设施的资产可见性。"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            <ol className="space-y-4 lg:col-span-7">
              {plan.outcomes.map((item, index) => (
                <li key={item} className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
                  <span className="text-gradient text-2xl font-bold">{String(index + 1).padStart(2, "0")}</span>
                  <p className="leading-relaxed text-ink-700">{item}</p>
                </li>
              ))}
            </ol>
            <div className="relative isolate overflow-hidden rounded-3xl bg-night-gradient p-7 text-white lg:col-span-5">
              <div className="absolute inset-0 -z-10 bg-grid-dark bg-grid opacity-50" aria-hidden="true" />
              <h3 className="text-lg font-bold">规划期内明确不做</h3>
              <p className="mt-2 text-sm text-white/60">能力边界写进计划，而不是事后补一条安全说明。</p>
              <ul className="mt-5 space-y-3">
                {plan.boundaries.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                    <Ban className="mt-0.5 size-4 shrink-0 text-brand-200" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="mt-16 text-lg font-bold text-ink-900">依托的技术基础</h3>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {plan.foundations.map((item) => (
              <li key={item.href}>
                {/* 悬停上浮只作用于内层，链接点击区域保持不动 */}
                <Link
                  href={item.href}
                  className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-4"
                >
                  <span className="flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 group-hover:-translate-y-1 group-hover:border-brand-200 group-hover:shadow-card-hover">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow">
                      <Icon name={item.icon ?? "sparkles"} className="size-5" />
                    </span>
                    <h4 className="mt-4 font-bold text-ink-900">{item.title}</h4>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{item.description}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                      了解更多
                      <LinkArrow />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTA content={home.cta} />
    </>
  );
}
