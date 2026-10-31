"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Maximize2, X } from "lucide-react";

import { LinkArrow } from "@/components/ui/LinkArrow";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

/**
 * 产品卡片。三款产品共用同一层级：标签、名称、简述、进展、底部操作。
 * 有公开界面时：悬停叠出截图或视频封面，点击「查看界面」打开大图。
 * 没有公开界面时：不渲染图片层，也不写「暂无截图」，底部改为「预约演示」。
 * 标题链接铺满卡片；底部按钮层叠更高，避免被整卡链接挡住。
 */
export function ProductCard({
  product,
  headingLevel = "h3",
  className,
}: {
  product: Product;
  /** 列表页直接位于 h1 之下时传 "h2"，保持标题层级连续 */
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const Heading = headingLevel;
  const titleId = `product-card-${product.slug}`;
  const dialogId = useId();
  const preview = getPublicPreview(product);
  const detailHref = `/products/${product.slug}`;
  const [open, setOpen] = useState(false);
  const openPreview = useCallback(() => setOpen(true), []);
  const closePreview = useCallback(() => setOpen(false), []);

  return (
    <article
      className={cn(
        "group relative isolate flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition-[box-shadow] duration-300 hover:shadow-card-hover sm:p-7",
        "has-[.product-card-hit:focus-visible]:ring-2 has-[.product-card-hit:focus-visible]:ring-brand-500 has-[.product-card-hit:focus-visible]:ring-offset-4",
        className,
      )}
    >
      <Link
        href={detailHref}
        aria-label={product.name}
        className="product-card-hit absolute inset-0 z-10 rounded-2xl focus-visible:outline-none"
      />

      <div className="relative">
        <p className="text-xs font-semibold text-brand-700">{product.tag}</p>

        <Heading id={titleId} className="mt-2 text-xl font-bold leading-snug text-ink-900 transition-colors group-hover:text-brand-800">
          {product.name}
        </Heading>

        <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{product.summary}</p>

        {preview && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-xl opacity-0 ring-1 ring-ink-900/10 transition duration-300 ease-out motion-reduce:transition-none [@media(hover:hover)]:group-hover:opacity-100"
          >
            <Image
              src={preview.src}
              alt=""
              fill
              sizes="(min-width: 1280px) 360px, (min-width: 768px) 46vw, 92vw"
              className="object-cover object-top"
            />
            <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/75 to-transparent px-3 pb-2.5 pt-8 text-xs text-white">
              {preview.title}
            </p>
          </div>
        )}
      </div>

      <p className="mt-5 border-t border-ink-100 pt-4 text-sm leading-relaxed text-ink-600">
        <span className="font-semibold text-ink-800">进展：</span>
        {product.status}
      </p>

      <div className="relative z-30 mt-auto flex items-center justify-between gap-3 pt-6">
        <Link
          href={detailHref}
          className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          了解更多
          <LinkArrow />
        </Link>
        {preview ? (
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={dialogId}
            onClick={openPreview}
            className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-ink-500 transition-colors hover:text-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            <Maximize2 className="size-3.5" aria-hidden="true" />
            {preview.kind === "poster" ? "查看封面" : "查看界面"}
          </button>
        ) : (
          <NoPreviewAction />
        )}
      </div>

      {preview && open && (
        <PreviewDialog id={dialogId} preview={preview} productName={product.name} onClose={closePreview} />
      )}
    </article>
  );
}

/** 没有公开界面：只给出预约入口，不渲染图片槽，也不提示「暂无截图」。 */
function NoPreviewAction() {
  return (
    <Link
      href="/contact#solution"
      className="inline-flex h-9 items-center rounded-full border border-brand-200 bg-white px-3.5 text-sm font-semibold text-brand-800 transition-colors hover:border-brand-300 hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
    >
      预约演示
    </Link>
  );
}

interface PublicPreview {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  caption?: string;
  device: "desktop" | "phone";
  href: string;
  count: number;
  kind: "screen" | "poster";
}

/**
 * 只在确实有可公开的界面图或视频封面时返回预览。
 * 艾博纳幺儿目前没有 screens，也没有演示视频，这里返回 null。
 */
function getPublicPreview(product: Product): PublicPreview | null {
  const shot = product.screens?.items[0];
  if (product.screens && shot) {
    return {
      src: shot.src,
      width: shot.width,
      height: shot.height,
      alt: shot.alt,
      title: shot.title,
      caption: shot.caption,
      device: product.screens.device,
      href: `/products/${product.slug}#screens`,
      count: product.screens.items.length,
      kind: "screen",
    };
  }

  const video = product.demo?.video ?? product.twin?.video;
  if (video?.poster) {
    return {
      src: video.poster,
      width: 1920,
      height: 1080,
      alt: product.demo?.title ?? product.name,
      title: product.demo?.title ?? product.name,
      device: "desktop",
      href: `/products/${product.slug}#demo`,
      count: 1,
      kind: "poster",
    };
  }

  return null;
}

function PreviewDialog({
  id,
  preview,
  productName,
  onClose,
}: {
  id: string;
  preview: PublicPreview;
  productName: string;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose]);

  const trapTab = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const items = [...panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
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

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8">
      <button type="button" className="absolute inset-0 bg-ink-900/50" aria-label="关闭预览" onClick={onClose} />
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={trapTab}
        className={cn(
          "relative z-10 flex max-h-[min(92vh,920px)] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-card-hover",
          preview.device === "phone" ? "max-w-md" : "max-w-5xl",
        )}
      >
        <div className="relative min-h-0 overflow-auto bg-ink-50">
          <Image
            src={preview.src}
            width={preview.width}
            height={preview.height}
            alt={preview.alt}
            sizes={preview.device === "phone" ? "448px" : "(min-width: 1024px) 960px, 100vw"}
            className={cn(
              "mx-auto h-auto max-h-[72vh] object-contain",
              preview.device === "phone" ? "w-auto max-w-full" : "w-full",
            )}
          />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="关闭预览"
            className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/95 text-ink-700 shadow-card transition-colors hover:text-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="border-t border-ink-100 px-5 py-4 sm:px-6">
          <h2 id={titleId} className="text-base font-bold text-ink-900">
            {productName}
            <span className="ml-2 text-sm font-medium text-ink-400">{preview.title}</span>
          </h2>
          {preview.caption && <p className="mt-2 text-sm leading-relaxed text-ink-600">{preview.caption}</p>}
          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-xs text-ink-400">
              {preview.count > 1 ? `详情页还有其余 ${preview.count - 1} 张界面` : "演示环境画面"}
            </p>
            <Link
              href={preview.href}
              className="shrink-0 text-sm font-semibold text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
            >
              在详情页查看
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
