"use client"; // 错误边界必须是客户端组件

import { useEffect } from "react";
import { RotateCw } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** 页面渲染出错时的兜底界面（导航与页脚仍保留） */
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // 接入错误监控（如 Sentry）后可在此上报
    console.error(error);
  }, [error]);

  const digest = error instanceof Error && "digest" in error ? String(error.digest) : undefined;

  return (
    <section className="py-28 sm:py-36">
      <Container className="text-center">
        <p className="text-brand-700 text-6xl font-extrabold sm:text-7xl">出错了</p>
        <h1 className="mt-6 text-2xl font-bold text-ink-900 sm:text-3xl">页面暂时无法显示</h1>
        <p className="mt-3 text-ink-500">请稍后重试；如问题持续存在，欢迎联系我们。</p>
        {digest && <p className="mt-2 text-xs text-ink-400">错误编号：{digest}</p>}
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-700 px-5 text-sm font-semibold text-white transition-all hover:brightness-110"
          >
            <RotateCw className="size-4" aria-hidden="true" />
            重新加载
          </button>
          <ButtonLink href="/" variant="secondary">
            返回首页
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
