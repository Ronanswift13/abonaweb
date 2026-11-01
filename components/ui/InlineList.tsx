import { cn } from "@/lib/utils";

/** 并列的短词：用间距分开，不用中间点连接 */
export function InlineList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-5", className)}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
