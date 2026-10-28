import { CTA } from "@/components/sections/CTA";
import { CultureTeam } from "@/components/sections/CultureTeam";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/data/about";
import { cultureValues } from "@/data/culture";
import { home } from "@/data/home";
import { site } from "@/data/site";
import { team } from "@/data/team";
import { pageMetadata } from "@/lib/metadata";
import { formatPhone } from "@/lib/utils";

export const metadata = pageMetadata({
  title: about.intro.title,
  description: about.intro.description,
  path: "/about",
});

export default function AboutPage() {
  const facts = [
    { label: "公司名称", value: site.name },
    { label: "英文名称", value: site.nameEn },
    { label: "品牌 / 大模型", value: `${site.brand}（艾博纳幺儿）` },
    { label: "官方网站", value: site.domain },
    { label: "联系人", value: `${site.contact.name} · ${formatPhone(site.contact.phone)}` },
  ];

  return (
    <>
      <PageHeader
        eyebrow={about.intro.eyebrow}
        title={about.intro.title}
        description={about.intro.description}
        breadcrumbs={[{ label: "关于我们", href: "/about" }]}
      />

      {/* 公司简介 */}
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 text-base leading-loose text-ink-600 sm:text-lg lg:col-span-7">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              {about.mission.map((m) => (
                <div key={m.title} className="border-l-2 border-brand-700 pl-5">
                  <p className="text-sm font-semibold text-brand-700">{m.title}</p>
                  <p className="mt-2 text-base font-medium leading-relaxed text-ink-800">{m.text}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <dl className="rounded-3xl border border-ink-100 bg-white p-7 shadow-card">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-1 border-b border-ink-100 py-4 first:pt-0 last:border-0 last:pb-0">
                  <dt className="text-xs text-ink-400">{f.label}</dt>
                  <dd className="font-medium text-ink-800">{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </Container>
      </section>

      {/* 发展历程 */}
      <section className="bg-ink-50/70 py-20">
        <Container>
          <SectionHeading eyebrow="MILESTONES" title="发展历程" />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {about.milestones.map((m) => (
              <li key={m.title} className="relative rounded-3xl border border-ink-100 bg-white p-7 shadow-card">
                <span className="text-brand-700 text-3xl font-extrabold">{m.year}</span>
                <h3 className="mt-3 text-lg font-bold text-ink-900">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{m.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CultureTeam culture={{ intro: home.culture, values: cultureValues }} team={{ intro: home.team, members: team }} />

      <CTA content={home.cta} />
    </>
  );
}
