/** 健康检查：供 Docker HEALTHCHECK / Nginx / 监控探活使用 */
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok", time: new Date().toISOString() });
}
