import {
  Bot,
  Brain,
  Briefcase,
  Building2,
  Clock,
  Compass,
  Cpu,
  Eye,
  Factory,
  Gauge,
  Globe,
  Handshake,
  Layers,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquareText,
  Network,
  Newspaper,
  Phone,
  Radar,
  Rocket,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

import type { IconName } from "@/types";

/**
 * 图标注册表：数据文件中的 icon 字段（IconName）→ lucide-react 组件
 * 新增图标：① 在 types/index.ts 的 IconName 中加名称 ② 在此处注册
 */
const ICONS: Record<IconName, LucideIcon> = {
  brain: Brain,
  bot: Bot,
  radar: Radar,
  scan: ScanSearch,
  zap: Zap,
  layers: Layers,
  network: Network,
  eye: Eye,
  shield: ShieldCheck,
  cpu: Cpu,
  factory: Factory,
  building: Building2,
  sparkles: Sparkles,
  rocket: Rocket,
  target: Target,
  users: Users,
  handshake: Handshake,
  lightbulb: Lightbulb,
  gauge: Gauge,
  message: MessageSquareText,
  briefcase: Briefcase,
  compass: Compass,
  newspaper: Newspaper,
  phone: Phone,
  wechat: MessageCircle,
  mail: Mail,
  map: MapPin,
  globe: Globe,
  clock: Clock,
};

interface IconProps extends LucideProps {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  // Markdown frontmatter 中的 icon 无法在编译期校验，未知名称时回退为 sparkles
  const Component = ICONS[name] ?? Sparkles;
  return <Component aria-hidden="true" strokeWidth={1.75} {...props} />;
}
