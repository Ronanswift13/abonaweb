"use client";

import { useCallback, useId, useState } from "react";

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
    <article className={cn("group relative flex gap-5", className)}>
      <div className="w-20 shrink-0">
        <Portrait src={avatar} alt="" initial={initial} position={member.avatarPosition} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-lg font-bold group-hover:text-red">
          {member.name}
          <span className="ml-2 text-[15px] font-normal">{member.title}</span>
        </h3>
        <p className="mt-1 flex-1 text-[15px] leading-relaxed">{member.bio}</p>

        {/* after 伪元素铺满条目，点任意位置都能打开简介 */}
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? dialogId : undefined}
          aria-label={`查看${member.name}（${member.title}）的详细资料`}
          onClick={() => setOpen(true)}
          className="team-card-hit mt-2 self-start text-[15px] font-bold text-red underline underline-offset-4 after:absolute after:inset-0 after:content-['']"
        >
          查看详细资料
        </button>
      </div>

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
