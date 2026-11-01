"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SearchForm } from "@/components/ui/SearchForm";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";
import { cn, formatPhone } from "@/lib/utils";

/** 首屏是产品色的页面：服务端先按这张表给导航上色，避免脚本运行前闪一下；其余页面是阅读区 */
const FIRST_SCREEN: Record<string, string> = {
  "/": "poye",
  "/products/poye-substation-monitoring": "poye",
  "/products/proactive-ai-agent": "agent",
  "/products/smart-logistics-assistant": "logi",
  "/products/abonayaoer": "yaoer",
};

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * 顶部导航
 * Logo 紧跟链接，最右是搜索和电话；不用“Logo 左、链接中、按钮右、底部细线”的模板
 * 底色跟随正下方这一屏，看不出边界；移动端（< lg）折叠为汉堡菜单
 */
export function Navbar() {
  const pathname = usePathname();
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

  // 导航跟随正下方这一屏的底色；区块用 data-nav 声明，没有声明的是白色阅读区
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let frame = 0;
    const follow = () => {
      frame = 0;
      const y = header.getBoundingClientRect().bottom + 1;
      const below = [...document.querySelectorAll<HTMLElement>("[data-nav]")].find((el) => {
        const box = el.getBoundingClientRect();
        return box.top <= y && box.bottom > y;
      });
      header.dataset.theme = below?.dataset.nav ?? "paper";
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(follow);
    };
    follow();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  const closeAll = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  return (
    <header ref={headerRef} data-theme={FIRST_SCREEN[pathname] ?? "paper"} className="site-nav sticky top-0 z-50">
      <Container className="flex h-[72px] items-center gap-8 xl:gap-11">
        <Logo />

        {/* 桌面端主导航 */}
        <nav aria-label="主导航" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-7">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "whitespace-nowrap border-b-2 py-1 text-[15px]",
                      active ? "border-paper font-bold" : "border-transparent hover:border-paper",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 xl:gap-5">
          <button
            type="button"
            onClick={() => {
              setSearchOpen((v) => !v);
              setMenuOpen(false);
            }}
            aria-label="站内搜索"
            aria-expanded={searchOpen}
            className="flex size-11 items-center justify-center"
          >
            <Search className="size-5" aria-hidden="true" />
          </button>

          <a href={`tel:${site.contact.phone}`} className="hidden whitespace-nowrap text-lg font-bold hover:underline sm:block">
            {formatPhone(site.contact.phone)}
          </a>

          <button
            type="button"
            onClick={() => {
              setMenuOpen((v) => !v);
              setSearchOpen(false);
            }}
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="flex size-11 items-center justify-center lg:hidden"
          >
            {menuOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {/* 搜索面板 */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-full bg-paper py-5 text-ink">
          <Container className="max-w-3xl">
            <SearchForm autoFocus onSubmit={closeAll} />
          </Container>
        </div>
      )}

      {/* 移动端菜单 */}
      {menuOpen && (
        <div id="mobile-nav" className="absolute bg-ink inset-x-0 top-full h-[calc(100dvh-72px)] overflow-y-auto text-paper lg:hidden">
          <Container className="py-6">
            <nav aria-label="移动端导航">
              <ul>
                {mainNav.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeAll}
                        aria-current={active ? "page" : undefined}
                        className={cn("block py-3 font-display text-3xl font-black", active && "underline underline-offset-8")}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <a href={`tel:${site.contact.phone}`} className="mt-8 block text-3xl font-bold">
              {formatPhone(site.contact.phone)}
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
