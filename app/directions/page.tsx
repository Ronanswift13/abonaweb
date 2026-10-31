import { CTA } from "@/components/sections/CTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { PlanSpotlight } from "@/components/sections/PlanSections";
import { Container } from "@/components/ui/Container";
import { directions, directionsIntro, horizons } from "@/data/directions";
import { home } from "@/data/home";
import { yuanyinPlan } from "@/data/plans";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: directionsIntro.title,
  description: directionsIntro.description,
  path: "/directions",
});

export default function DirectionsPage() {
  return (
    <>
      <PageHeader
        title={directionsIntro.title}
        description={directionsIntro.description}
        breadcrumbs={[{ label: directionsIntro.title, href: "/directions" }]}
      />

      {/* 重点发展计划 */}
      <section className="pt-20">
        <Container>
          <PlanSpotlight plan={yuanyinPlan} />
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="space-y-16">
            {horizons.map((horizon) => {
              const items = directions.filter((d) => d.horizon === horizon.key);
              if (items.length === 0) return null;
              return (
                <div key={horizon.key}>
                  <h2 className="text-2xl font-bold text-ink-900">{horizon.label}</h2>
                  <p className="mt-2 text-ink-500">{horizon.description}</p>

                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {items.map((d) => (
                      <article
                        key={d.id}
                        id={d.id}
                        className="rounded-xl border border-ink-200 bg-white p-7"
                      >
                        <h3 className="text-lg font-bold text-ink-900">{d.title}</h3>
                        <p className="mt-4 text-sm leading-relaxed text-ink-500">{d.summary}</p>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {d.focus.map((f) => (
                            <li key={f} className="rounded-full border border-brand-100 bg-brand-50/60 px-3 py-1 text-xs text-brand-800">
                              {f}
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <CTA content={home.cta} />
    </>
  );
}
