import type { Metadata, Viewport } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
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
    images: [{ url: site.logo.src, width: site.logo.width, height: site.logo.height, alt: site.logo.alt }],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#00AEEF",
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(organizationJsonLd) }} />
      </body>
    </html>
  );
}
