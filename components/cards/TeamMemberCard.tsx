import Image from "next/image";

import { cn } from "@/lib/utils";
import type { TeamMember } from "@/types";

/** 团队成员卡片；未提供头像时显示 initial（缺省为姓名首字） */
export function TeamMemberCard({ member, className }: { member: TeamMember; className?: string }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {member.avatar ? (
          <Image
            src={member.avatar}
            alt={member.name}
            width={96}
            height={96}
            className="size-12 shrink-0 rounded-2xl object-cover"
          />
        ) : (
          <span
            className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-700 text-lg font-bold text-white"
            aria-hidden="true"
          >
            {member.initial ?? member.name.slice(0, 1)}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="font-bold text-ink-900">{member.name}</h3>
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
    </article>
  );
}
