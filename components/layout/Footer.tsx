import Link from "next/link";

import { ContactList } from "@/components/ui/ContactList";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { footerColumns } from "@/data/navigation";
import { site } from "@/data/site";

/** 页脚：公司信息 / 快速链接 / 联系方式 / 版权与备案 */
export function Footer() {
  const year = new Date().getFullYear();
  const copyrightYears = year > site.foundedYear ? `${site.foundedYear}–${year}` : `${year}`;

  return (
    <footer className="relative overflow-hidden bg-brand-800 text-white/75">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid opacity-30" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 right-0 size-[480px] rounded-full bg-brand-600/30 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid gap-12 py-16 lg:grid-cols-12">
          {/* 公司信息 */}
          <div className="lg:col-span-4">
            <Logo invert />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/75">{site.description}</p>
            <p className="mt-4 text-xs text-white/65">{site.nameEn}</p>
          </div>

          {/* 链接分栏 */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-white">{column.title}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 联系方式 */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-white">联系我们</h3>
            <ContactList invert showQr className="mt-4" />
          </div>
        </div>

        {/* 版权与备案 */}
        <div className="flex flex-col gap-3 border-t border-white/15 py-6 text-xs text-white/65 md:flex-row md:items-center md:justify-between">
          <p>
            © {copyrightYears} {site.name} 版权所有
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              {site.icp.record}
            </a>
            {site.icp.police && (
              <a
                href="https://beian.mps.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {site.icp.police}
              </a>
            )}
            <span>{site.domain}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
