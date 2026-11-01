/**
 * 生成标题字体子集 app/fonts/noto-sans-sc-black.subset.woff2
 * 用法：npm run fonts:subset
 * - 思源黑体 Black 全量 8.8MB，这里只保留站内实际出现的字，体积降到几百 KB
 * - 新增文案出现新字后重新执行；字库里没有的字会回退到系统黑体
 * - 源字体（SIL OFL 1.1）首次运行时下载到 node_modules/.cache，不进仓库
 */
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

import subsetFont from "subset-font";

const root = fileURLToPath(new URL("..", import.meta.url));
const sourceUrl = "https://github.com/notofonts/noto-cjk/raw/main/Sans/SubsetOTF/SC/NotoSansSC-Black.otf";
const sourcePath = join(root, "node_modules/.cache/abona-fonts/NotoSansSC-Black.otf");
const outputPath = join(root, "app/fonts/noto-sans-sc-black.subset.woff2");

/** 文案所在目录：标题可能来自这里的任何文件 */
const textRoots = ["app", "components", "content", "data"];
const textExtensions = new Set([".ts", ".tsx", ".md", ".mdx"]);

/** ASCII 可见字符与常用中文标点始终保留，标题里的数字和英文不必逐个扫描 */
const baseChars =
  Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join("") + "，。、；：？！“”‘’（）《》「」—…·";

async function collectText(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const parts = await Promise.all(
    entries.map(async (entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return collectText(full);
      return textExtensions.has(extname(entry.name)) ? readFile(full, "utf8") : "";
    }),
  );
  return parts.join("");
}

if (!existsSync(sourcePath)) {
  console.log(`下载源字体：${sourceUrl}`);
  const response = await fetch(sourceUrl);
  if (!response.ok) throw new Error(`下载失败：HTTP ${response.status}`);
  await mkdir(dirname(sourcePath), { recursive: true });
  await writeFile(sourcePath, Buffer.from(await response.arrayBuffer()));
}

const text = (await Promise.all(textRoots.map((dir) => collectText(join(root, dir))))).join("");
const cjk = new Set(text.match(/\p{Script=Han}/gu));
const subset = await subsetFont(await readFile(sourcePath), baseChars + [...cjk].join(""), {
  targetFormat: "woff2",
});
await writeFile(outputPath, subset);
console.log(`${cjk.size} 个汉字 → ${(subset.length / 1024).toFixed(0)} KB`);
