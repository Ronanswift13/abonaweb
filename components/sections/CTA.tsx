import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { CtaContent } from "@/types";

/** 页面底部的联系入口；具体联系方式在页脚 */
export function CTA({ content }: { content: CtaContent }) {
  return (
    <section className="border-t border-ink-100 bg-white py-14">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-ink-900">{content.title}</h2>
          <p className="mt-2 leading-relaxed text-ink-600">{content.description}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <ButtonLink href={content.primary.href}>{content.primary.label}</ButtonLink>
          <ButtonLink href={content.secondary.href} variant="secondary">
            {content.secondary.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
