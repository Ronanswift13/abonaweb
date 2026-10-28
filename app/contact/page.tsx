import { Check, Phone } from "lucide-react";

import { PageHeader } from "@/components/sections/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { ContactList } from "@/components/ui/ContactList";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactPage } from "@/data/about";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { formatPhone } from "@/lib/utils";

export const metadata = pageMetadata({
  title: contactPage.intro.title,
  description: contactPage.intro.description,
  path: "/contact",
});

export default function ContactPage() {
  const { intro, solution, process, note } = contactPage;

  return (
    <>
      <PageHeader
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        breadcrumbs={[{ label: intro.title, href: "/contact" }]}
      />

      <section className="py-20">
        <Container className="grid gap-8 lg:grid-cols-12">
          {/* 联系方式卡片 */}
          <div className="rounded-2xl bg-night p-8 text-white sm:p-10 lg:col-span-5">
            <div>
              <h2 className="text-2xl font-bold">{site.name}</h2>
              <p className="mt-1 text-sm text-ink-300">{site.nameEn}</p>
              <ContactList invert extended showQr className="mt-8" />
              <ButtonLink
                href={`tel:${site.contact.phone}`}
                variant="light"
                size="lg"
                className="mt-8 w-full"
                icon={<Phone className="size-4" aria-hidden="true" />}
              >
                立即致电 {formatPhone(site.contact.phone)}
              </ButtonLink>
              <p className="mt-4 text-xs leading-relaxed text-ink-300">{note}</p>
            </div>
          </div>

          {/* 获取解决方案 */}
          <div id="solution" className="rounded-[2rem] border border-ink-100 bg-white p-8 shadow-card sm:p-10 lg:col-span-7">
            <SectionHeading eyebrow={solution.eyebrow} title={solution.title} description={solution.description} />
            <ul className="mt-8 space-y-3">
              {solution.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl bg-ink-50 p-4 text-sm text-ink-700 sm:text-base">
                  <Check className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-10 text-sm font-semibold text-ink-900">合作流程</h3>
            <ol className="mt-4 grid gap-4 sm:grid-cols-4">
              {process.map((step, index) => (
                <li key={step.title} className="rounded-2xl border border-ink-100 p-4">
                  <span className="text-brand-700 text-xl font-bold">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-2 font-semibold text-ink-900">{step.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>
    </>
  );
}
