"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Menu, Phone, Search, X } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SearchForm } from "@/components/ui/SearchForm";
import { mainNav, navCta } from "@/data/navigation";
import { site } from "@/data/site";
import { cn, formatPhone } from "@/lib/utils";

/** 页面滚动超过 8px 时为导航栏加阴影 */
function useScrolled() {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > 8,
    () => false,
  );
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * 顶部导航
 * 左：Logo + 公司名；中：主导航；右：搜索入口 + 联系我们
 * 移动端（< lg）折叠为汉堡菜单
 */
export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Esc 关闭；点击导航外部关闭搜索面板
  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen, searchOpen]);

  // 移动端菜单打开时锁定页面滚动
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const closeAll = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b bg-white/85 backdrop-blur-xl transition-[border-color,box-shadow] duration-300",
        scrolled || menuOpen ? "border-ink-100 shadow-[0_8px_30px_-12px_rgba(17,24,39,0.10)]" : "border-transparent",
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-4 xl:gap-6">
        <Logo />

        {/* 桌面端主导航 */}
        <nav aria-label="主导航" className="hidden lg:block">
          {/* lg 档（1024px 起）空间较紧：缩小字号与内边距并禁止折行，xl 档恢复宽松间距 */}
          <ul className="flex items-center xl:gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative whitespace-nowrap rounded-full px-1.5 py-2 text-sm font-medium transition-colors xl:px-4 xl:text-[15px]",
                      active ? "text-brand-700" : "text-ink-600 hover:text-brand-700",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-1.5 -bottom-0.5 h-0.5 rounded-full bg-brand-700 transition-opacity xl:inset-x-4",
                        active ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSearchOpen((v) => !v);
              setMenuOpen(false);
            }}
            aria-label="站内搜索"
            aria-expanded={searchOpen}
            className={cn(
              "flex size-10 items-center justify-center rounded-full transition-colors",
              searchOpen ? "bg-brand-50 text-brand-700" : "text-ink-600 hover:bg-ink-50 hover:text-brand-700",
            )}
          >
            <Search className="size-5" aria-hidden="true" />
          </button>

          <ButtonLink href={navCta.href} size="sm" className="hidden h-10 px-5 sm:inline-flex">
            {navCta.label}
          </ButtonLink>

          <button
            type="button"
            onClick={() => {
              setMenuOpen((v) => !v);
              setSearchOpen(false);
            }}
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="flex size-10 items-center justify-center rounded-full text-ink-700 hover:bg-ink-50 lg:hidden"
          >
            {menuOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {/* 搜索面板 */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-full border-b border-ink-100 bg-white/95 py-5 shadow-card backdrop-blur-xl">
          <Container className="max-w-3xl">
            <SearchForm autoFocus onSubmit={closeAll} />
          </Container>
        </div>
      )}

      {/* 移动端菜单 */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full h-[calc(100dvh-72px)] overflow-y-auto border-t border-ink-100 bg-white lg:hidden"
        >
          <Container className="py-6">
            <nav aria-label="移动端导航">
              <ul className="divide-y divide-ink-100">
                {mainNav.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeAll}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between py-4 text-lg font-medium",
                          active ? "text-brand-700" : "text-ink-800",
                        )}
                      >
                        {item.label}
                        {active && <span className="size-2 rounded-full bg-brand-700" aria-hidden="true" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-6 space-y-3">
              <ButtonLink href={navCta.href} size="lg" className="w-full" arrow>
                {navCta.label}
              </ButtonLink>
              <a
                href={`tel:${site.contact.phone}`}
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-ink-200 text-sm font-semibold text-ink-800"
              >
                <Phone className="size-4 text-brand-700" aria-hidden="true" />
                {site.contact.name} · {formatPhone(site.contact.phone)}
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
