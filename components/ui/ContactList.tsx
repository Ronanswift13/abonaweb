import { CopyButton } from "@/components/ui/CopyButton";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/data/site";
import { cn, formatPhone } from "@/lib/utils";

interface ContactListProps {
  /** 深色背景上使用 */
  invert?: boolean;
  /** 是否显示地址、工作时间等扩展信息 */
  extended?: boolean;
  className?: string;
}

/**
 * 联系方式列表（联系人 / 电话 / 微信 …）
 * 数据来自 data/site.ts → contact，CTA、页脚、联系页共用。
 */
export function ContactList({ invert = false, extended = false, className }: ContactListProps) {
  const { contact, address, serviceHours, domain } = site;

  const iconBox = cn(
    "flex size-10 shrink-0 items-center justify-center rounded-xl",
    invert ? "bg-white/10 text-aqua-300" : "bg-brand-50 text-brand-600",
  );
  const label = cn("text-xs", invert ? "text-ink-300" : "text-ink-400");
  const value = cn("font-semibold", invert ? "text-white" : "text-ink-900");

  return (
    <ul className={cn("space-y-4", className)}>
      <li className="flex items-center gap-3">
        <span className={iconBox}>
          <Icon name="users" className="size-5" />
        </span>
        <div>
          <p className={label}>联系人</p>
          <p className={value}>
            {contact.name}
            {contact.title && <span className="ml-2 text-sm font-normal opacity-70">{contact.title}</span>}
          </p>
        </div>
      </li>

      <li className="flex items-center gap-3">
        <span className={iconBox}>
          <Icon name="phone" className="size-5" />
        </span>
        <div>
          <p className={label}>电话</p>
          <a
            href={`tel:${contact.phone}`}
            className={cn(value, "tabular-nums tracking-wide hover:underline")}
            aria-label={`拨打电话 ${contact.phone}`}
          >
            {formatPhone(contact.phone)}
          </a>
        </div>
      </li>

      <li className="flex items-center gap-3">
        <span className={iconBox}>
          <Icon name="wechat" className="size-5" />
        </span>
        <div className="min-w-0">
          <p className={label}>微信</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn(value, "break-all")}>{contact.wechat}</span>
            <CopyButton
              value={contact.wechat}
              label="复制微信号"
              className={invert ? "border-white/25 text-ink-200 hover:border-white hover:text-white" : undefined}
            />
          </div>
        </div>
      </li>

      {contact.email && (
        <li className="flex items-center gap-3">
          <span className={iconBox}>
            <Icon name="mail" className="size-5" />
          </span>
          <div>
            <p className={label}>邮箱</p>
            <a href={`mailto:${contact.email}`} className={cn(value, "hover:underline")}>
              {contact.email}
            </a>
          </div>
        </li>
      )}

      {extended && (
        <>
          <li className="flex items-center gap-3">
            <span className={iconBox}>
              <Icon name="globe" className="size-5" />
            </span>
            <div>
              <p className={label}>官方网站</p>
              <p className={value}>{domain}</p>
            </div>
          </li>
          {address && (
            <li className="flex items-center gap-3">
              <span className={iconBox}>
                <Icon name="map" className="size-5" />
              </span>
              <div>
                <p className={label}>地址</p>
                <p className={value}>{address}</p>
              </div>
            </li>
          )}
          {serviceHours && (
            <li className="flex items-center gap-3">
              <span className={iconBox}>
                <Icon name="clock" className="size-5" />
              </span>
              <div>
                <p className={label}>工作时间</p>
                <p className={value}>{serviceHours}</p>
              </div>
            </li>
          )}
        </>
      )}
    </ul>
  );
}
