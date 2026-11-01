import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import type { LinkItem } from "@/types";

interface PageHeaderProps {
  title: string;
  description?: string;
  /** 面包屑（不含“首页”，会自动添加） */
  breadcrumbs?: LinkItem[];
  /** 新闻、案例的标题是整句话，用 md 档 */
  size?: "lg" | "md";
  children?: React.ReactNode;
}

/** 子页面页头：和导航、阅读区同一个底色，靠大标题分层 */
export function PageHeader({ title, description, breadcrumbs = [], size = "lg", children }: PageHeaderProps) {
  return (
    <section>
      <Container className="pb-2 pt-4 sm:pb-4">
        <Breadcrumbs items={breadcrumbs} />
        <h1
          className={cn(
            "mt-10 max-w-6xl sm:mt-14",
            size === "lg"
              ? "text-[2.75rem] leading-[1.12] sm:text-6xl lg:text-[5rem]"
              : "text-[2rem] leading-[1.2] sm:text-[2.75rem] lg:text-[3.25rem]",
          )}
        >
          {title}
        </h1>
        {description && <p className="mt-6 max-w-[38em]">{description}</p>}
        {children}
      </Container>
    </section>
  );
}
