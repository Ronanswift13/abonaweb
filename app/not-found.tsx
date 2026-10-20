import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-light bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden="true" />
      <Container className="text-center">
        <p className="text-gradient text-7xl font-extrabold sm:text-8xl">404</p>
        <h1 className="mt-6 text-2xl font-bold text-ink-900 sm:text-3xl">页面不存在</h1>
        <p className="mt-3 text-ink-500">您访问的页面可能已被移动或删除。</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" arrow>
            返回首页
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            联系我们
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
