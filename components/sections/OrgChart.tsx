import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { Organization } from "@/types";

/** 汇报线上的一段竖线，不进入读屏 */
function Stem() {
  return <div className="mx-auto h-7 w-px bg-brand-300" aria-hidden="true" />;
}

/**
 * 公司架构：董事会 → 总经理 → 三个并列体系。
 * 治理两级居中；体系按行展开，部门在右侧网格里，避免某一列因部门多而把另外两列拉空。
 */
export function OrgChart({ organization }: { organization: Organization }) {
  const { intro, board, executive, systems } = organization;

  return (
    <section id="organization" className="scroll-mt-24 border-t border-ink-100 bg-ink-50/70 py-20 sm:py-24">
      <Container>
        <SectionHeading {...intro} />
        <p className="sr-only">汇报关系自上而下为董事会、总经理，其下三个体系并列。</p>

        <div className="mx-auto mt-14 flex w-full max-w-sm flex-col">
          <article className="rounded-2xl bg-brand-800 px-6 py-5 text-center text-white shadow-card">
            <h3 className="text-lg font-bold">{board.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-white/75">{board.duty}</p>
          </article>
          <Stem />
          <article className="rounded-2xl border border-brand-200 bg-white px-6 py-5 text-center shadow-card">
            <h3 className="text-lg font-bold text-brand-900">{executive.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-600">{executive.duty}</p>
          </article>
          <Stem />
        </div>

        <ol className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card">
          {systems.map((system, index) => (
            <li
              key={system.name}
              className={cn(
                "grid gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:items-start lg:gap-10",
                index > 0 && "border-t border-ink-100",
              )}
            >
              <div className="lg:col-span-4">
                <h3 className="text-xl font-bold text-ink-900">{system.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{system.summary}</p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                {system.units.map((unit) => (
                  <li key={unit.name} className="rounded-2xl border border-ink-100 bg-ink-50/70 p-5">
                    <h4 className="font-semibold text-ink-900">{unit.name}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{unit.duty}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
