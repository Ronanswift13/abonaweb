import { TeamMemberCard } from "@/components/cards/TeamMemberCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
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
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {culture.values.map((value) => (
              <article
                key={value.title}
                className="group rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-200"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-600 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-gradient group-hover:text-white">
                  <Icon name={value.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink-900">{value.title}</h3>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-500">{value.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{value.description}</p>
              </article>
            ))}
          </div>
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
