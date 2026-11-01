/** 按竖线分词组，词组内部不换行，避免“值/守中心”这样断开 */
export function Phrases({ text }: { text: string }) {
  return text.split("|").map((phrase) => (
    <span key={phrase} className="inline-block">
      {phrase}
    </span>
  ));
}
