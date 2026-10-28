import { TeamMemberCard } from "@/components/cards/TeamMemberCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CultureValue, LinkItem, SectionIntro, TeamMember } from "@/types";

interface CultureTeamProps {
  culture: { intro: SectionIntro; values: CultureValue[] };
  team: { intro: SectionIntro; members: TeamMember[]; more?: LinkItem };
}

/** 企业文化（左）+ 核心团队（右） */
export function CultureTeam({ culture, team }: CultureTeamProps) {
  return (
    <section className="bg-ink-50/70 py-20 sm:py-24">
      <Container className="grid gap-14 lg:grid-cols-2 lg:gap-16">
        {/* 企业文化 */}
        <div>
          <SectionHeading {...culture.intro} />
          <ol className="mt-10 space-y-6">
            {culture.values.map((value, index) => (
              <li key={value.title} className="flex gap-4 border-t border-ink-200 pt-5">
                <span className="w-6 shrink-0 font-mono text-sm text-ink-400">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-bold text-ink-900">{value.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{value.description}</p>
                  <p className="mt-2 text-xs text-ink-400">出处：{value.subtitle}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* 核心团队 */}
        <div>
          <SectionHeading
            {...team.intro}
            action={
              team.more && (
                <ButtonLink href={team.more.href} variant="ghost" size="sm" arrow>
                  {team.more.label}
                </ButtonLink>
              )
            }
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {team.members.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
