import { OrgChart } from "@/components/sections/OrgChart";
import { PageHeader } from "@/components/sections/PageHeader";
import { TeamSection } from "@/components/sections/TeamSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/data/about";
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
    { label: "大模型", value: `艾博纳幺儿（${site.brand}）` },
    { label: "官方网站", value: site.domain },
    { label: "联系人", value: `${site.contact.name} ${formatPhone(site.contact.phone)}` },
  ];

  return (
    <>
      <PageHeader
        title={about.intro.title}
        description={about.intro.description}
        breadcrumbs={[{ label: "关于我们", href: "/about" }]}
      />

      {/* 公司简介 */}
      <section className="bg-paper py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <div className="space-y-5">
            {about.paragraphs.map((p) => (
              <p key={p} className="max-w-[38em]">
                {p}
              </p>
            ))}
          </div>
          <aside className="space-y-8">
            <dl className="grid gap-3">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-sm">{f.label}</dt>
                  <dd className="font-bold">{f.value}</dd>
                </div>
              ))}
            </dl>
            {about.mission.map((m) => (
              <div key={m.title}>
                <p className="font-display text-2xl font-black">{m.title}</p>
                <p className="mt-1">{m.text}</p>
              </div>
            ))}
          </aside>
        </Container>
      </section>

      <OrgChart organization={about.organization} />

      {/* 发展历程：是真实的时间顺序，所以按时间排 */}
      <section className="bg-paper py-20 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading title="发展历程" />
          </div>
          <ol className="grid gap-8">
            {about.milestones.map((m) => (
              <li key={m.title} className="grid gap-1 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-8">
                <span className="font-bold">{m.year}</span>
                <div>
                  <h3 className="font-display text-2xl font-black leading-snug">{m.title}</h3>
                  <p className="mt-1 max-w-[36em]">{m.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <TeamSection intro={home.team} members={team} />
    </>
  );
}
