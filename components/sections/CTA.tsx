import { ButtonLink } from "@/components/ui/Button";
import { ContactList } from "@/components/ui/ContactList";
import { Container } from "@/components/ui/Container";
import type { CtaContent } from "@/types";

/** 底部强 CTA：获取解决方案 + 联系我们，并明确展示联系人电话与微信 */
export function CTA({ content }: { content: CtaContent }) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="rounded-2xl bg-brand-800 px-6 py-12 sm:px-12 sm:py-16 lg:px-16">

          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">{content.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">{content.title}</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{content.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={content.primary.href} variant="light" size="lg" arrow>
                  {content.primary.label}
                </ButtonLink>
                <ButtonLink href={content.secondary.href} variant="outline-light" size="lg">
                  {content.secondary.label}
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/25 bg-night-900/30 p-6 backdrop-blur-md sm:p-8">
                <p className="mb-5 text-sm font-semibold text-white">{content.contactTitle}</p>
                <ContactList invert />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
