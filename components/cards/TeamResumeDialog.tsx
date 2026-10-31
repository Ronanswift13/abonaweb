"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { site } from "@/data/site";
import { TEAM_AVATAR_MAX_BYTES } from "@/lib/team-avatar";
import { cn } from "@/lib/utils";
import type { TeamMember, TeamResumeEntry } from "@/types";

function Portrait({
  src,
  alt,
  initial,
  large,
  position = "center top",
}: {
  src?: string;
  alt: string;
  initial: string;
  large?: boolean;
  /** 卡片裁切焦点。简介大图不使用。 */
  position?: string;
}) {
  return (
    <div className="relative aspect-[5/7] overflow-hidden rounded-sm border border-ink-200 bg-ink-50">
      {src ? (
        // 宣传照在本地上传后才出现，地址还可能带缓存参数，不走图片优化。
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
          style={{ objectPosition: position }}
        />
      ) : (
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-brand-700 font-bold text-white",
            large ? "text-3xl" : "text-lg",
          )}
          aria-hidden="true"
        >
          {initial}
        </span>
      )}
    </div>
  );
}

function ResumeBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="border-l-2 border-brand-700 pl-3 text-base font-bold text-ink-900">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Timeline({ items }: { items: TeamResumeEntry[] }) {
  return (
    <ol>
      {items.map((item, index) => (
        <li
          key={`${item.title}-${index}`}
          className="grid gap-1 border-t border-ink-100 py-4 first:border-t-0 first:pt-0 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-x-6"
        >
          {item.period ? <p className="text-sm text-ink-400 sm:pt-0.5">{item.period}</p> : null}
          <div className={item.period ? undefined : "sm:col-span-2"}>
            <p className="font-semibold text-ink-900">{item.title}</p>
            {item.org && <p className="mt-0.5 text-sm text-ink-600">{item.org}</p>}
            {item.detail && <p className="mt-1 text-sm leading-relaxed text-ink-600">{item.detail}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

function TeamAvatarUpload({
  memberId,
  pending,
  message,
  error,
  onPick,
}: {
  memberId: string;
  pending: boolean;
  message: string;
  error: string;
  onPick: (file: File) => void;
}) {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="mt-3">
      <label
        htmlFor={`avatar-${memberId}`}
        className={cn(
          "inline-flex cursor-pointer text-sm font-semibold text-brand-700 underline-offset-4 hover:underline",
          pending && "pointer-events-none text-ink-400",
        )}
      >
        <input
          id={`avatar-${memberId}`}
          type="file"
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          className="sr-only"
          disabled={pending}
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) onPick(file);
          }}
        />
        {pending ? "正在保存…" : "上传证件照"}
      </label>
      <p className="mt-1.5 text-xs leading-relaxed text-ink-400">竖版证件照，JPG、PNG 或 WebP，小于 4MB。保存后作为宣传头像。</p>
      {message && (
        <p role="status" className="mt-1.5 text-xs text-ink-600">
          {message}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-brand-800">
          {error}
        </p>
      )}
    </div>
  );
}

/** 全屏看大图：点空白处、关闭按钮或按 Esc 退出。大图里只有关闭按钮一个焦点。 */
function PhotoLightbox({
  src,
  member,
  closeRef,
  onClose,
}: {
  src: string;
  member: TeamMember;
  closeRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name}的宣传照大图`}
      onKeyDown={(event) => {
        if (event.key === "Tab") event.preventDefault();
      }}
      className="fixed inset-0 z-20 flex flex-col items-center justify-center gap-3 p-4 sm:p-6"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="关闭大图"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out bg-ink-900/95"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${member.name}的宣传照大图`}
        className="relative max-h-[calc(100dvh-5.5rem)] max-w-full object-contain"
      />
      <p className="relative text-sm text-white/80">
        {member.name} · {member.title}
      </p>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="关闭大图"
        className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-white text-ink-800 shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <X className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}

export function TeamResumeDialog({
  member,
  avatar,
  onAvatarChange,
  onClose,
  dialogId,
}: {
  member: TeamMember;
  avatar?: string;
  onAvatarChange: (src: string) => void;
  onClose: () => void;
  dialogId: string;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [zoom, setZoom] = useState(false);
  const photoButtonRef = useRef<HTMLButtonElement>(null);
  const zoomCloseRef = useRef<HTMLButtonElement>(null);
  const initial = member.initial ?? member.name.slice(0, 1);
  const directions = member.research?.length ? member.research : member.expertise;
  const affiliation = member.affiliation ?? site.name;
  const degree = (member.education ?? [])
    .map((item) => `${item.org ?? ""}${item.title}`.trim())
    .filter(Boolean)
    .join("、");

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      previous?.focus();
    };
  }, [onClose]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (zoom) setZoom(false);
      else onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, zoom]);

  useEffect(() => {
    if (!zoom) return;
    const photoButton = photoButtonRef.current;
    zoomCloseRef.current?.focus();
    return () => {
      photoButton?.focus();
    };
  }, [zoom]);

  const trapTab = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const items = [
      ...panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input:not([disabled]), select, textarea"),
    ];
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const onPick = async (file: File) => {
    setMessage("");
    setError("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("请上传 JPG、PNG 或 WebP 证件照。");
      return;
    }
    if (file.size > TEAM_AVATAR_MAX_BYTES) {
      setError("证件照需小于 4MB。");
      return;
    }

    setPending(true);
    try {
      const body = new FormData();
      body.set("memberId", member.id);
      body.set("file", file);
      const response = await fetch("/api/team-avatar", { method: "POST", body });
      const payload = (await response.json().catch(() => null)) as { avatar?: string; error?: string } | null;
      if (!response.ok || !payload?.avatar) {
        setError(payload?.error ?? "证件照没有保存成功。");
        return;
      }
      onAvatarChange(`${payload.avatar}?v=${Date.now()}`);
      setMessage("已保存为宣传头像。");
    } catch {
      setError("证件照没有保存成功。");
    } finally {
      setPending(false);
    }
  };

  const upload = (
    <TeamAvatarUpload
      memberId={member.id}
      pending={pending}
      message={message}
      error={error}
      onPick={(file) => void onPick(file)}
    />
  );

  const facts = [
    ...(member.gender ? [{ label: "性别", value: member.gender }] : []),
    ...(degree ? [{ label: "学历", value: degree }] : []),
    { label: "所在单位", value: affiliation },
    ...(directions.length > 0 ? [{ label: "研究方向", value: directions.join("、") }] : []),
  ];

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8">
      <button type="button" className="absolute inset-0 bg-ink-900/50" aria-label="关闭简介" onClick={onClose} />
      <div
        ref={panelRef}
        id={dialogId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={trapTab}
        inert={zoom ? true : undefined}
        className="relative z-10 flex max-h-[min(92vh,920px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-card-hover"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-ink-100 px-5 py-3 sm:px-8">
          <p className="text-sm font-semibold text-ink-700">个人简历</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="关闭简介"
            className="flex size-9 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-50 hover:text-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto">
          {/* 有照片时左栏放大图；没有照片时只留姓名首字，不占一整栏 */}
          <div
            className={cn(
              "grid gap-6 px-5 py-6 sm:items-start sm:gap-8 sm:px-8 sm:py-8",
              avatar ? "sm:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]" : "grid-cols-[5rem_minmax(0,1fr)] sm:grid-cols-[6rem_minmax(0,1fr)]",
            )}
          >
            <div>
              {avatar ? (
                <button
                  ref={photoButtonRef}
                  type="button"
                  onClick={() => setZoom(true)}
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded-sm border border-ink-200 bg-ink-50 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                >
                  {/* 简介里完整展示宣传照，不裁成证件照。 */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatar}
                    alt={`${member.name}的宣传照`}
                    className="mx-auto h-auto max-h-[46vh] w-full object-contain sm:max-h-[62vh]"
                  />
                  <span className="absolute bottom-2 right-2 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand-800 shadow-card">
                    查看大图
                  </span>
                </button>
              ) : (
                <Portrait src={undefined} alt="" initial={initial} large />
              )}
              {avatar && upload}
            </div>

            <div className="min-w-0">
              <h2 id={titleId} className="text-2xl font-bold text-ink-900">
                {member.name}
              </h2>
              <p className="mt-1 text-base font-medium text-brand-800">{member.title}</p>
              <dl className="mt-5 divide-y divide-ink-100 border-y border-ink-100">
                {facts.map((fact) => (
                  <div key={fact.label} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 py-3 text-sm">
                    <dt className="text-ink-400">{fact.label}</dt>
                    <dd className="leading-relaxed text-ink-800">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              {!avatar && upload}
            </div>
          </div>

          <div className="space-y-8 border-t border-ink-100 px-5 py-6 sm:px-8 sm:py-8">
            <ResumeBlock title="个人简介">
              <p className="whitespace-pre-wrap text-[15px] leading-7 text-ink-600">{member.bio}</p>
            </ResumeBlock>

            {member.education && member.education.length > 0 && (
              <ResumeBlock title="教育经历">
                <Timeline items={member.education} />
              </ResumeBlock>
            )}

            {member.experience && member.experience.length > 0 && (
              <ResumeBlock title="工作经历">
                <Timeline items={member.experience} />
              </ResumeBlock>
            )}

            {member.projects && member.projects.length > 0 && (
              <ResumeBlock title="科研项目">
                <Timeline items={member.projects} />
              </ResumeBlock>
            )}

            {member.publications && member.publications.length > 0 && (
              <ResumeBlock title="代表性成果">
                <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-700">
                  {member.publications.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </ResumeBlock>
            )}
          </div>
        </div>
      </div>

      {zoom && avatar && (
        <PhotoLightbox src={avatar} member={member} closeRef={zoomCloseRef} onClose={() => setZoom(false)} />
      )}
    </div>,
    document.body,
  );
}

export { Portrait };
