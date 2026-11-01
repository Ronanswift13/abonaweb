import Image from "next/image";

import { CopyButton } from "@/components/ui/CopyButton";
import { site } from "@/data/site";
import { cn, formatPhone } from "@/lib/utils";

interface ContactListProps {
  /** 深色背景上使用 */
  invert?: boolean;
  /** 是否显示地址、工作时间等扩展信息 */
  extended?: boolean;
  /** 是否显示微信二维码（需在 data/site.ts 配置 contact.wechatQr） */
  showQr?: boolean;
  className?: string;
}

/**
 * 联系方式列表（联系人 / 电话 / 微信 …）
 * 数据来自 data/site.ts → contact，页脚、联系页共用。
 */
export function ContactList({ invert = false, extended = false, showQr = false, className }: ContactListProps) {
  const { contact, address, serviceHours, domain } = site;

  const row = cn("flex gap-4 border-t py-3 first:border-t-0 first:pt-0", invert ? "border-paper/30" : "border-ink/15");
  const label = cn("w-16 shrink-0 text-sm", invert ? "text-paper" : "text-ink");
  const value = cn("min-w-0 font-bold", invert ? "text-paper" : "text-ink");

  return (
    <dl className={className}>
      <div className={row}>
        <dt className={label}>联系人</dt>
        <dd className={value}>
          {contact.name}
          {contact.title && <span className="ml-2 text-sm font-normal opacity-70">{contact.title}</span>}
        </dd>
      </div>

      <div className={row}>
        <dt className={label}>电话</dt>
        <dd className={value}>
          <a href={`tel:${contact.phone}`} className="tabular-nums hover:underline">
            {formatPhone(contact.phone)}
          </a>
        </dd>
      </div>

      <div className={row}>
        <dt className={label}>微信</dt>
        <dd className={cn(value, "flex flex-wrap items-center gap-2")}>
          <span className="break-all">{contact.wechat}</span>
          <CopyButton
            value={contact.wechat}
            label="复制微信号"
            className={invert ? "border-paper/30 text-paper hover:border-paper/30 hover:text-paper" : undefined}
          />
        </dd>
      </div>

      {showQr && contact.wechatQr && (
        <div className={row}>
          <dt className={label}>扫码</dt>
          <dd>
            <Image
              src={contact.wechatQr}
              alt={`${contact.name}的微信二维码`}
              width={240}
              height={240}
              className="size-28 bg-paper p-1.5"
            />
          </dd>
        </div>
      )}

      {contact.email && (
        <div className={row}>
          <dt className={label}>邮箱</dt>
          <dd className={value}>
            <a href={`mailto:${contact.email}`} className="hover:underline">
              {contact.email}
            </a>
          </dd>
        </div>
      )}

      {extended && (
        <>
          <div className={row}>
            <dt className={label}>官网</dt>
            <dd className={value}>{domain}</dd>
          </div>
          {address && (
            <div className={row}>
              <dt className={label}>地址</dt>
              <dd className={value}>{address}</dd>
            </div>
          )}
          {serviceHours && (
            <div className={row}>
              <dt className={label}>工作时间</dt>
              <dd className={value}>{serviceHours}</dd>
            </div>
          )}
        </>
      )}
    </dl>
  );
}
