import { TeamMemberCard } from "@/components/cards/TeamMemberCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import type { LinkItem, SectionIntro, TeamMember } from "@/types";

interface TeamSectionProps {
  intro: SectionIntro;
  members: TeamMember[];
  more?: LinkItem;
}

/** 核心团队：点击成员查看简介与大图 */
export function TeamSection({ intro, members, more }: TeamSectionProps) {
  return (
    <section className="bg-paper pb-20 sm:pb-28">
      <Container>
        <SectionHeading {...intro} action={more && <TextLink href={more.href}>{more.label}</TextLink>} />
        <div className="mt-8 grid gap-x-14 gap-y-6 md:grid-cols-2">
          {members.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}
