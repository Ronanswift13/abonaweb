/**
 * 生成社交分享图 public/images/og-default.png（1200×630）
 * 用法：npm run og:generate
 * - 文案、配色写在下方 svg 中；更换品牌色 / 公司名 / Logo 后重新执行即可
 * - 中文依赖本机字体（macOS 苹方 / Windows 微软雅黑），请在已安装中文字体的电脑上执行
 * - 三维站取自 public/videos/twin-orbit.jpg，反白 Logo 取自 public/images/brand
 */
import { fileURLToPath } from "node:url";

import sharp from "sharp"; // 随 next 一起安装的图片处理库

const projectDir = fileURLToPath(new URL("..", import.meta.url));
const W = 1200, H = 630;
const font = `font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <text x="56" y="104" ${font} font-size="46" font-weight="900" fill="#E8F4FD">具备自主AI功能的</text>
  <text x="56" y="166" ${font} font-size="46" font-weight="900" fill="#E8F4FD">变电站巡视平台</text>
  <text x="128" y="568" ${font} font-size="22" fill="#E8F4FD">北京艾博纳信息技术有限公司</text>
</svg>`;

const logo = await sharp(projectDir + "/public/images/brand/logo-light.png").resize({ height: 48 }).toBuffer();
await sharp(projectDir + "/public/videos/twin-orbit.jpg")
  .resize(W, H, { fit: "cover", position: "right" })
  .composite([
    { input: Buffer.from(svg), left: 0, top: 0 },
    { input: logo, left: 56, top: 532 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(projectDir + "/public/images/og-default.png");
console.log("written");
