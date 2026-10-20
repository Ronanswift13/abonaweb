/**
 * 生成社交分享图 public/images/og-default.png（1200×630）
 * 用法：npm run og:generate
 * - 文案、配色写在下方 svg 中；更换品牌色 / 公司名 / Logo 后重新执行即可
 * - 中文依赖本机字体（macOS 苹方 / Windows 微软雅黑），请在已安装中文字体的电脑上执行
 */
import { fileURLToPath } from "node:url";

import sharp from "sharp"; // 随 next 一起安装的图片处理库

const projectDir = fileURLToPath(new URL("..", import.meta.url));
const W = 1200, H = 630;
const font = `font-family="PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"`;
const grid = Array.from({ length: Math.ceil(W / 48) }, (_, i) => `<line x1="${i * 48}" y1="0" x2="${i * 48}" y2="${H}"/>`).join("")
  + Array.from({ length: Math.ceil(H / 48) }, (_, i) => `<line x1="0" y1="${i * 48}" x2="${W}" y2="${i * 48}"/>`).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="band" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#B12525"/><stop offset="0.5" stop-color="#9B1B1B"/><stop offset="1" stop-color="#7F1D1D"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.6">
      <stop offset="0" stop-color="#FBE0E0" stop-opacity="0.9"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#FFFFFF"/>
  <g stroke="#111827" stroke-opacity="0.045" stroke-width="1">${grid}</g>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect x="0" y="0" width="14" height="${H}" fill="url(#band)"/>

  <text x="96" y="300" ${font} font-size="64" font-weight="700" fill="#111827">北京艾博纳信息技术有限公司</text>
  <text x="96" y="360" ${font} font-size="24" font-weight="500" fill="#6B7280" letter-spacing="1">Beijing Aibona Information Technology Co., Ltd.</text>

  <text x="96" y="440" ${font} font-size="34" font-weight="600" fill="#9B1B1B">自研行业大模型「艾博纳幺儿」Abonayaoer</text>
  <text x="96" y="492" ${font} font-size="26" fill="#374151">行业大模型 · 主动 AI 智能体 · 变电站智能监测 · 数字孪生</text>

  <rect x="96" y="540" width="56" height="3" fill="#9B1B1B"/>
  <text x="168" y="550" ${font} font-size="24" font-weight="600" fill="#111827" letter-spacing="1">www.abonayaoer.com</text>
</svg>`;

const logo = await sharp(projectDir + "/public/images/logo.png").resize({ height: 150 }).toBuffer();
await sharp(Buffer.from(svg))
  .composite([{ input: logo, left: 96, top: 72 }])
  .png({ compressionLevel: 9 })
  .toFile(projectDir + "/public/images/og-default.png");
console.log("written");
