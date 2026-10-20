"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    _hmt?: unknown[][];
  }
}

/**
 * 百度统计（可选）：设置构建变量 NEXT_PUBLIC_BAIDU_TONGJI_ID 后启用，未设置时不加载任何脚本。
 * 站内跳转为前端路由，脚本默认只统计首次加载，这里在路由变化时补报页面浏览。
 */
export function BaiduAnalytics({ siteId }: { siteId: string }) {
  const pathname = usePathname();
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false; // 首次加载由 hm.js 自动统计
      return;
    }
    window._hmt = window._hmt ?? [];
    window._hmt.push(["_trackPageview", pathname]);
  }, [pathname]);

  return (
    <Script id="baidu-tongji" strategy="afterInteractive">
      {`var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?${siteId}";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();`}
    </Script>
  );
}
