"use client"; // 错误边界必须是客户端组件

import "./globals.css";

/**
 * 根布局本身出错时的兜底页面：会替换整个根布局，因此需要自带 <html> / <body> 与样式。
 * 不依赖 data/ 与业务组件，尽量保证在任何情况下都能渲染。
 */
export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="zh-CN">
      <body className="flex min-h-screen items-center justify-center bg-paper px-4">
        <title>页面出错了 | 北京艾博纳信息技术有限公司</title>
        <main>
          <p className="text-ink text-6xl font-bold">出错了</p>
          <h1 className="mt-6 text-2xl font-bold text-ink">网站暂时无法访问</h1>
          <p className="mt-3 text-ink">请稍后重试。</p>
          <div className="mt-10 flex gap-3">
            <button
              type="button"
              onClick={() => retry()}
              className="h-11 bg-red px-6 text-sm font-bold text-paper"
            >
              重新加载
            </button>
            {/* 根布局失效时使用原生链接整页刷新 */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="flex h-11 items-center border border-ink/15 px-6 text-sm font-bold text-ink">
              返回首页
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
