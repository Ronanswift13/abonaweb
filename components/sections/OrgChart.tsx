import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Organization } from "@/types";

/** 汇报线上的一段竖线，不进入读屏 */
function Stem() {
  return <div className="ml-8 h-7 w-0.5 bg-ink" aria-hidden="true" />;
}

/**
 * 公司架构：董事会 → 总经理 → 三个并列体系。
 * 治理两级靠左；体系按行展开，部门在右侧网格里，避免某一列因部门多而把另外两列拉空。
 */
export function OrgChart({ organization }: { organization: Organization }) {
  const { intro, board, executive, systems } = organization;

  return (
    <section id="organization" className="scroll-mt-24 bg-paper pb-20 pt-4 sm:pb-24">
      <Container>
        <SectionHeading {...intro} />
        <p className="sr-only">汇报关系自上而下为董事会、总经理，其下三个体系并列。</p>

        <div className="mt-12 flex w-full max-w-sm flex-col">
          <article className="bg-ink px-6 py-5 text-paper">
            <h3 className="text-lg font-bold">{board.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-paper">{board.duty}</p>
          </article>
          <Stem />
          <article className="border-[1.5px] border-ink px-6 py-5">
            <h3 className="text-lg font-bold">{executive.name}</h3>
            <p className="mt-1 text-sm leading-relaxed">{executive.duty}</p>
          </article>
          <Stem />
        </div>

        <ol className="mt-4 grid gap-10">
          {systems.map((system) => (
            <li
              key={system.name}
              className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-10"
            >
              <div className="lg:col-span-4">
                <h3 className="text-xl font-bold text-ink">{system.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink">{system.summary}</p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                {system.units.map((unit) => (
                  <li key={unit.name}>
                    <h4 className="font-bold text-ink">{unit.name}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink">{unit.duty}</p>
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
