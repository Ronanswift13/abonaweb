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
        title={intro.title}
        description={intro.description}
        breadcrumbs={[{ label: intro.title, href: "/contact" }]}
      />

      <section className="bg-paper py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-12">
          {/* 联系方式卡片 */}
          <div className="bg-ink p-8 text-paper sm:p-10 lg:col-span-5">
            <div>
              <h2 className="text-2xl font-bold">{site.name}</h2>
              <p className="mt-1 text-sm text-paper">{site.nameEn}</p>
              <ContactList invert extended showQr className="mt-8" />
              <ButtonLink
                href={`tel:${site.contact.phone}`}
                variant="onDark"
                className="mt-8 w-full"
                icon={<Phone className="size-4" aria-hidden="true" />}
              >
                立即致电 {formatPhone(site.contact.phone)}
              </ButtonLink>
              <p className="mt-4 text-sm leading-relaxed text-paper">{note}</p>
            </div>
          </div>

          {/* 获取解决方案 */}
          <div id="solution" className="scroll-mt-24 lg:col-span-7 lg:pl-8">
            <SectionHeading title={solution.title} description={solution.description} />
            <ul className="mt-8 space-y-2">
              {solution.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-ink" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-10 font-display text-2xl font-black">合作流程</h3>
            <ol className="mt-4 grid gap-4 sm:grid-cols-4">
              {process.map((step, index) => (
                <li key={step.title}>
                  <p className="font-bold text-ink">
                    {index + 1}. {step.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>
    </>
  );
}
