import { CaseCard } from "@/components/cards/CaseCard";
import { CTA } from "@/components/sections/CTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { home } from "@/data/home";
import { getAllCases } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const title = "项目案例";
const description = "来自电力能源、企业服务与工业互联网等领域的落地实践。";

export const metadata = pageMetadata({ title, description, path: "/cases" });

export default function CasesPage() {
  const cases = getAllCases();

  return (
    <>
      <PageHeader eyebrow="CASE STUDIES" title={title} description={description} breadcrumbs={[{ label: title, href: "/cases" }]} />
      <section className="py-20">
        <Container>
          {cases.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cases.map((item) => (
                <CaseCard key={item.slug} item={item} />
              ))}
            </div>
          ) : (
            <p className="py-20 text-center text-ink-400">案例整理中，敬请期待。</p>
          )}
        </Container>
      </section>
      <CTA content={home.cta} />
    </>
  );
}
