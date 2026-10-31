import { BusinessCard } from "@/components/cards/BusinessCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { BusinessDirection, SectionIntro } from "@/types";

/** 首页业务方向 */
export function BusinessSection({ intro, items }: { intro: SectionIntro; items: BusinessDirection[] }) {
  return (
    <section className="bg-ink-50/70 py-20 sm:py-24">
      <Container>
        <SectionHeading {...intro} />
        <ul className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id}>
              <BusinessCard item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
