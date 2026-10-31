"use client";

import { useCallback, useId, useState } from "react";
import { ChevronRight } from "lucide-react";

import { Portrait, TeamResumeDialog } from "@/components/cards/TeamResumeDialog";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/types";

/** 团队成员卡片。点击打开简历式简介；未提供证件照时显示姓名首字。 */
export function TeamMemberCard({ member, className }: { member: TeamMember; className?: string }) {
  const dialogId = useId();
  const [open, setOpen] = useState(false);
  const [override, setOverride] = useState<string | undefined>();
  const avatar = override ?? member.avatar;
  const close = useCallback(() => setOpen(false), []);
  const initial = member.initial ?? member.name.slice(0, 1);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-[box-shadow] duration-300 hover:shadow-card-hover",
        "has-[.team-card-hit:focus-visible]:ring-2 has-[.team-card-hit:focus-visible]:ring-brand-500 has-[.team-card-hit:focus-visible]:ring-offset-2",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <div className="w-16 shrink-0">
          <Portrait src={avatar} alt="" initial={initial} position={member.avatarPosition} />
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-ink-900 transition-colors group-hover:text-brand-800">{member.name}</h3>
          <p className="text-sm font-medium text-brand-700">{member.title}</p>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-500">{member.bio}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {member.expertise.map((tag) => (
          <li key={tag} className="rounded-md bg-ink-50 px-2 py-0.5 text-xs text-ink-600">
            {tag}
          </li>
        ))}
      </ul>

      {/* after 伪元素铺满卡片，点卡片任意位置都能打开简介 */}
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        aria-label={`查看${member.name}（${member.title}）的详细资料`}
        onClick={() => setOpen(true)}
        className="team-card-hit mt-4 inline-flex items-center gap-1 self-start text-sm font-semibold text-brand-700 after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none"
      >
        查看详细资料
        <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </button>

      {open && (
        <TeamResumeDialog
          dialogId={dialogId}
          member={member}
          avatar={avatar}
          onAvatarChange={setOverride}
          onClose={close}
        />
      )}
    </article>
  );
}
