import { PageHeader } from "@/components/sections/PageHeader";
import { PlanScene } from "@/components/sections/Scenes";
import { Container } from "@/components/ui/Container";
import { InlineList } from "@/components/ui/InlineList";
import { directions, directionsIntro, horizons } from "@/data/directions";
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
      <PlanScene />

      <section className="bg-paper py-20 sm:py-28">
        <Container className="space-y-16">
          {horizons.map((horizon) => {
            const items = directions.filter((d) => d.horizon === horizon.key);
            if (items.length === 0) return null;
            return (
              <div key={horizon.key} className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-3">
                  <h2 className="text-[2.25rem] leading-[1.15] sm:text-5xl">{horizon.label}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink">{horizon.description}</p>
                </div>
                <div className="grid gap-8 lg:col-span-9">
                  {items.map((d) => (
                    <article key={d.id} id={d.id} className="scroll-mt-24">
                      <h3 className="font-display text-2xl font-black leading-snug">{d.title}</h3>
                      <p className="mt-1.5 max-w-[38em]">{d.summary}</p>
                      <InlineList items={d.focus} className="mt-1.5 text-[15px]" />
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

    </>
  );
}
