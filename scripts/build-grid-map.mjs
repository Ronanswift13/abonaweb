/**
 * 生成首页发展计划这一屏的矢量电网图
 * 用法：npm run map:build [DarkBreaker 仓库路径]，默认 ../DarkBreaker
 *
 * 数据是 DarkBreaker 抓取的 OpenStreetMap 云南电网（data/osm/yunnan_power，ODbL，不进它的仓库）。
 * 颜色、线宽和站点半径照抄 DarkBreaker 的 configs/region_osm_overlay.yaml 和 configs/region_grid.yaml，
 * 这样网站和产品里同一电压等级是同一个颜色。
 *
 * 取舍：
 * - 不用 configs/region_grid.yaml 的站点清单和联络线：里面有待核的占位站和未核对的联络线，不对外。
 * - 不画省界（level 4）：其中一段是国界，只画省内的州市界。
 * - 不画站名：OSM 里绝大多数站没有名字，也没有必要对外标注。
 *
 * 地址带 #lines 时不画州市名：光带只提亮线路，见 components/ui/GridMap.tsx。
 */
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const repo = resolve(process.argv[2] ?? join(root, "..", "DarkBreaker"));
const dataDir = join(repo, "data/osm/yunnan_power");
const out = process.env.MAP_OUT ?? join(root, "public/images/brand/yunnan-grid.svg");

if (!existsSync(join(dataDir, "lines.geojson"))) {
  console.error(`找不到 ${dataDir}/lines.geojson。先在 DarkBreaker 里运行 scripts/fetch_osm_power_grid.py`);
  process.exit(1);
}

/** 画布和取景：左边压在文字下面，文字右侧的清晰区是大理到昆明这一段 */
const WIDTH = 1600;
const HEIGHT = 1100;
const VIEW_WEST = 97;
const VIEW_EAST = 103.6;
const VIEW_CENTER_LAT = 25;
/** 道格拉斯-普克简化容差，单位是画布像素；0.35 在 4K 屏上也看不出折线变化 */
const TOLERANCE = 0.35;

/** 从高到低匹配。max_kv 为空的线路归入 unknown，照实画灰 */
const BANDS = [
  { id: "uhv", minKv: 600, color: "#b388ff", width: 3.4, dot: 6 },
  { id: "500kV", minKv: 400, color: "#ff4d6d", width: 2.4, dot: 5 },
  { id: "220kV", minKv: 200, color: "#22d3ee", width: 1.5, dot: 3.8 },
  { id: "110kV", minKv: 100, color: "#5f9e84", width: 1, dot: 3 },
  { id: "35kV", minKv: 30, color: "#6b7a91", width: 0.8, dot: 2.6 },
  { id: "lv", minKv: 0.001, color: "#56627a", width: 0.7, dot: 2.2 },
];
const UNKNOWN = { id: "unknown", color: "#7d8798", width: 0.8, dot: 2.4 };
/** 画的顺序：低压和未标注垫底，骨干压在最上面 */
const DRAW_ORDER = ["unknown", "lv", "35kV", "110kV", "220kV", "500kV", "uhv"];

const bandOf = (kv) => (kv == null ? UNKNOWN : BANDS.find((band) => kv >= band.minKv) ?? UNKNOWN);

const read = (name) => JSON.parse(readFileSync(join(dataDir, `${name}.geojson`), "utf8")).features;

/** Web Mercator，和 DarkBreaker 的 Leaflet 底图同一投影 */
const mercY = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
const toRad = (lng) => (lng * Math.PI) / 180;
const scale = WIDTH / (toRad(VIEW_EAST) - toRad(VIEW_WEST));
const centerY = mercY(VIEW_CENTER_LAT);
const project = ([lng, lat]) => [
  (toRad(lng) - toRad(VIEW_WEST)) * scale,
  HEIGHT / 2 - (mercY(lat) - centerY) * scale,
];

function simplify(points) {
  if (points.length < 3) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [first, last] = stack.pop();
    const [ax, ay] = points[first];
    const [bx, by] = points[last];
    const dx = bx - ax;
    const dy = by - ay;
    const length = Math.hypot(dx, dy) || 1;
    let worst = 0;
    let index = -1;
    for (let i = first + 1; i < last; i++) {
      const distance = Math.abs(dy * (points[i][0] - ax) - dx * (points[i][1] - ay)) / length;
      if (distance > worst) {
        worst = distance;
        index = i;
      }
    }
    if (worst > TOLERANCE) {
      keep[index] = 1;
      stack.push([first, index], [index, last]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

/** 一位小数的相对坐标路径，比绝对坐标省一半体积 */
const num = (value) => {
  const text = (Math.round(value * 10) / 10).toFixed(1).replace(/\.0$/, "");
  return text.replace(/^(-?)0\./, "$1.");
};

function pathOf(points) {
  let [x, y] = points[0].map((v) => Math.round(v * 10) / 10);
  let d = `M${num(x)} ${num(y)}l`;
  const parts = [];
  for (const [px, py] of points.slice(1)) {
    const nx = Math.round(px * 10) / 10;
    const ny = Math.round(py * 10) / 10;
    parts.push(`${num(nx - x)} ${num(ny - y)}`);
    x = nx;
    y = ny;
  }
  d += parts.join(" ").replace(/ -/g, "-");
  return d;
}

const inView = (points) =>
  points.some(([x, y]) => x > -40 && x < WIDTH + 40 && y > -40 && y < HEIGHT + 40);

function polylines(features) {
  return features.flatMap((feature) => {
    const points = feature.geometry.coordinates.map(project);
    return inView(points) ? [pathOf(simplify(points))] : [];
  });
}

/** 零长度线段加圆头，每个站点只占十几个字节 */
const dotPath = (points) => points.map(([x, y]) => `M${num(x)} ${num(y)}h0`).join("");

const lines = read("lines").filter((feature) => feature.geometry.type === "LineString");
const boundaries = read("boundaries");
const substations = read("substations");

const lineLayers = DRAW_ORDER.map((id) => {
  const band = id === "unknown" ? UNKNOWN : BANDS.find((b) => b.id === id);
  const features = lines.filter((feature) => bandOf(feature.properties.max_kv).id === id);
  const opacity = id === "unknown" ? ' stroke-opacity=".62"' : "";
  return `<path stroke="${band.color}" stroke-width="${band.width}"${opacity} d="${polylines(features).join("")}"/>`;
});

const stations = substations
  .map((feature) => ({ point: project(feature.properties.center), band: bandOf(feature.properties.max_kv) }))
  .filter(({ point: [x, y] }) => x > 0 && x < WIDTH && y > 0 && y < HEIGHT);

/** 220kV 及以上画成空心环（DarkBreaker 的站点符号），其余是小圆点 */
const rings = ["220kV", "500kV", "uhv"].map((id) => {
  const band = BANDS.find((b) => b.id === id);
  const dots = dotPath(stations.filter((s) => s.band.id === id).map((s) => s.point));
  const outer = band.dot * 2;
  return `<path stroke="${band.color}" stroke-width="${outer}" d="${dots}"/><path stroke="#0b0b0b" stroke-width="${outer - 2.4}" d="${dots}"/><path stroke="${band.color}" stroke-width="${band.dot * 0.7}" d="${dots}"/>`;
});
const smallStations = ["unknown", "lv", "35kV", "110kV"].map((id) => {
  const band = id === "unknown" ? UNKNOWN : BANDS.find((b) => b.id === id);
  const dots = dotPath(stations.filter((s) => s.band.id === id).map((s) => s.point));
  return dots ? `<path stroke="${band.color}" stroke-width="${band.dot * 1.5}" d="${dots}"/>` : "";
});

const cityBorders = polylines(
  boundaries.filter((feature) => feature.geometry.type === "LineString" && feature.properties.level === 5),
);

/** 州市名只留一层：县名在这个取景下太密。左边压在文字下面的不画 */
const labels = boundaries
  .filter((feature) => feature.geometry.type === "Point" && feature.properties.level === 5)
  .map((feature) => {
    const [x, y] = project(feature.geometry.coordinates);
    const name = feature.properties.name.replace(/自治州$|市$/, "").replace(/(?:白|彝|傣|景颇|傈僳|藏|哈尼|壮|苗)族/g, "");
    return { x, y, name };
  })
  .filter(({ x, y }) => x > WIDTH * 0.44 && x < WIDTH - 40 && y > 40 && y < HEIGHT - 40)
  .map(({ x, y, name }) => `<text x="${num(x)}" y="${num(y)}">${name}</text>`);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
<title>云南电网线路和变电站分布</title>
<desc>数据：© OpenStreetMap contributors（ODbL）</desc>
<style>
text{font:600 17px "PingFang SC","Noto Sans CJK SC","Noto Sans SC","Microsoft YaHei",sans-serif;fill:#c9ced6;text-anchor:middle;paint-order:stroke;stroke:#0b0b0b;stroke-width:4px}
@media (max-width:760px){.labels{display:none}}
#lines:target~.labels{display:none}
</style>
<path fill="none" stroke="#8f9bad" stroke-opacity=".22" stroke-width=".8" d="${cityBorders.join("")}"/>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
<g stroke-opacity=".7">${smallStations.join("")}</g>
${lineLayers.join("\n")}
${rings.join("\n")}
</g>
<g id="lines"></g>
<g class="labels">${labels.join("")}</g>
</svg>
`;

writeFileSync(out, svg);
const size = statSync(out).size;
console.log(`${out}\n${(size / 1024).toFixed(0)} KB，线路 ${lines.length} 条，站点 ${stations.length} 个`);
