import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-28 sm:py-36">
      <Container>
        <p className="text-ink text-7xl font-bold sm:text-8xl">404</p>
        <h1 className="mt-6 text-2xl font-bold text-ink sm:text-3xl">页面不存在</h1>
        <p className="mt-3 text-ink">您访问的页面可能已被移动或删除。</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">
            返回首页
          </ButtonLink>
          <ButtonLink href="/contact">
            联系我们
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
