import type { Metadata, Viewport } from "next";

import { BaiduAnalytics } from "@/components/layout/BaiduAnalytics";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BackToTop } from "@/components/ui/BackToTop";
import { site } from "@/data/site";
import { toJsonLd } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.brand}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: site.name,
    title: `${site.name} | ${site.brand}`,
    description: site.description,
    url: "/",
    images: [site.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.brand}`,
    description: site.description,
    images: [site.ogImage.url],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#9B1B1B",
};

/** 组织结构化数据（SEO） */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: [site.nameEn, site.brand],
  url: site.url,
  logo: `${site.url}${site.logo.src}`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: `+86-${site.contact.phone}`,
    name: site.contact.name,
    areaServed: "CN",
    availableLanguage: ["zh-CN"],
  },
};

/** 百度统计站点 ID（构建时注入，未设置则不加载统计脚本） */
const baiduTongjiId = process.env.NEXT_PUBLIC_BAIDU_TONGJI_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth" className="scroll-smooth">
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:shadow-card"
        >
          跳到主要内容
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(organizationJsonLd) }} />
        {baiduTongjiId && <BaiduAnalytics siteId={baiduTongjiId} />}
      </body>
    </html>
  );
}
