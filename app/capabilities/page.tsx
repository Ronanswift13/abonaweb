
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { capabilities, capabilitiesIntro } from "@/data/capabilities";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: capabilitiesIntro.title,
  description: capabilitiesIntro.description,
  path: "/capabilities",
});

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader
        title={capabilitiesIntro.title}
        description={capabilitiesIntro.description}
        breadcrumbs={[{ label: capabilitiesIntro.title, href: "/capabilities" }]}
      >
        {/* 能力锚点导航 */}
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {capabilities.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="text-[15px] underline underline-offset-4"
              >
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </PageHeader>

      <section className="bg-paper">
        <Container className="py-6">
          {capabilities.map((c) => (
            <article id={c.id} key={c.id} className="grid gap-6 py-14 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="text-[2.25rem] leading-[1.15] sm:text-5xl">{c.title}</h2>
                <p className="mt-4">{c.summary}</p>
              </div>
              <ul className="space-y-4 lg:col-span-7">
                {c.points.map((point) => (
                  <li key={point} className="max-w-[38em]">
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Container>
      </section>

    </>
  );
}
