/**
 * 反 AI 味检查，规则见 DESIGN.md 第 7 节
 * 用法：npm run check:design [目录或文件 ...]
 * 默认检查 app、components、data、content；可以指定目录，例如 public/prototype
 * 脚本没有运行框架，只做逐行匹配，判断不了的内容按 DESIGN.md 第 8 节自检
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const targets = process.argv.slice(2);
const roots = (targets.length ? targets : ["app", "components", "data", "content"]).map((p) => join(root, p));
const extensions = new Set([".ts", ".tsx", ".css", ".md", ".html"]);

/** name：报告里的中文名；pattern：匹配一行；code：只查代码，不查 md 正文 */
const rules = [
  // 视频上的暗色遮罩是唯一例外，类名必须含 scrim
  { name: "渐变", pattern: /^(?!.*scrim).*(gradient|bg-clip-text|background-clip:\s*text)/i, code: true },
  { name: "默认字体", pattern: /\b(Inter|Roboto|Open Sans|Poppins|Lato|DM Sans|Space Grotesk|Plus Jakarta)\b(?!section)/, code: true },
  { name: "毛玻璃", pattern: /backdrop-blur|backdrop-filter/, code: true },
  { name: "眉标或全大写小标签", pattern: /eyebrow|\buppercase\b|text-transform:\s*uppercase|tracking-\[0?\.\d+em\]/, code: true },
  { name: "等宽字体做标签", pattern: /font-mono|font-family:\s*[^;]*mono/i, code: true },
  { name: "中间点连接", pattern: /\S\s·\s\S+\s·\s\S|join\(" · "\)/ },
  { name: "箭头跟在文字后", pattern: /<LinkArrow|\sarrow(?=[\s/>=])|<ArrowRight|→\s*(?:<|"|$)/, code: true },
  { name: "居中文案", pattern: /text-center|text-align:\s*center/, code: true },
  { name: "红色做大面积底色", pattern: /<(?:section|footer|header|main|body)\b[^>]*\bbg-red\b/, code: true },
  { name: "emoji", pattern: /\p{Extended_Pictographic}(?<![©®™])/u },
  { name: "空话", pattern: /赋能|全链路|一站式|打造|助力|深耕|领先|无缝|颠覆|新一代|全方位|降本增效/ },
  { name: "汇报腔", pattern: /工程化集成|阶段性|复验|第二阶段研发/ },
  // 注释里的素材来源说明不算
  { name: "现状说明", pattern: /^(?!\s*(?:\/\/|\*|\/\*|#)).*(尚未|未验收|未接入现场|只做过内部测试|暂未涉及|处于研究阶段)/ },
  { name: "套话按钮", pattern: /了解更多|立即体验|立即开始/ },
];

function walk(path) {
  if (!existsSync(path)) return [];
  if (statSync(path).isFile()) return [path];
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(path, entry.name)) : [join(path, entry.name)],
  );
}

const files = roots.flatMap(walk).filter((file) => extensions.has(extname(file)));
const hits = new Map(rules.map((rule) => [rule.name, []]));
const threeColumns = [];

for (const file of files) {
  const isMarkdown = extname(file) === ".md";
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((text, index) => {
      const where = `${relative(root, file)}:${index + 1}`;
      for (const rule of rules) {
        if (rule.code && isMarkdown) continue;
        if (rule.pattern.test(text)) hits.get(rule.name).push(`${where}  ${text.trim().slice(0, 70)}`);
      }
      if (/grid-cols-3|repeat\(3,/.test(text)) threeColumns.push(where);
    });
}

// 只有手机操作三步可以三列：首页和产品页各展示一次，内容相同
const phoneSteps = ["components/sections/ProductMedia.tsx", "components/sections/Scenes.tsx"];
const otherThreeColumns = threeColumns.filter((where) => !phoneSteps.some((file) => where.startsWith(file)));
if (otherThreeColumns.length > 0) hits.set("手机操作三步以外的三列", otherThreeColumns);

let total = 0;
for (const [name, list] of hits) {
  if (list.length === 0) continue;
  total += list.length;
  console.log(`\n${name}（${list.length}）`);
  for (const line of list.slice(0, 8)) console.log(`  ${line}`);
  if (list.length > 8) console.log(`  还有 ${list.length - 8} 处`);
}

console.log(total ? `\n共 ${total} 处不符合 DESIGN.md` : `检查通过：${files.length} 个文件`);
process.exit(total ? 1 : 0);
