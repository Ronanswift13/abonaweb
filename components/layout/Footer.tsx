import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { CopyButton } from "@/components/ui/CopyButton";
import { Logo } from "@/components/ui/Logo";
import { footerLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { formatPhone } from "@/lib/utils";

/** 页脚：一条矮的深色带，放联系方式和备案信息 */
export function Footer() {
  const year = new Date().getFullYear();
  const copyrightYears = year > site.foundedYear ? `${site.foundedYear}–${year}` : `${year}`;
  const { contact } = site;

  return (
    <footer data-nav="ink" className="bg-ink text-paper">
      <Container className="py-7">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
          <Logo invert />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
            <a href={`tel:${contact.phone}`} className="text-xl font-bold hover:underline">
              {formatPhone(contact.phone)}
            </a>
            <span>{contact.name}</span>
            <span>{site.serviceHours}</span>
            <span className="inline-flex items-center gap-2">
              微信 {contact.wechat}
              <CopyButton value={contact.wechat} label="复制" className="border-paper/40 text-paper hover:border-paper" />
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-10 gap-y-2 text-sm">
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="flex flex-wrap gap-x-6">
            <span>
              © {copyrightYears} {site.name}
            </span>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              {site.icp.record}
            </a>
            {site.icp.police && (
              <a href="https://beian.mps.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                {site.icp.police}
              </a>
            )}
          </p>
        </div>
      </Container>
    </footer>
  );
}
