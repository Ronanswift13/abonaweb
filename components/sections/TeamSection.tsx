import { TeamMemberCard } from "@/components/cards/TeamMemberCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { LinkItem, SectionIntro, TeamMember } from "@/types";

interface TeamSectionProps {
  intro: SectionIntro;
  members: TeamMember[];
  more?: LinkItem;
}

/** 核心团队：点击卡片查看成员简介与大图 */
export function TeamSection({ intro, members, more }: TeamSectionProps) {
  return (
    <section className="bg-ink-50/70 py-20 sm:py-24">
      <Container>
        <SectionHeading
          {...intro}
          action={
            more && (
              <ButtonLink href={more.href} variant="ghost" size="sm" arrow>
                {more.label}
              </ButtonLink>
            )
          }
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}
