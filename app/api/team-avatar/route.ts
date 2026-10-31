import { team } from "@/data/team";
import { saveMemberAvatar } from "@/lib/team-avatar-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const members = new Set(team.map((member) => member.id));

/**
 * 本地开发时保存成员证件照。
 * 正式站点不提供这个接口，避免访客改写宣传头像。
 */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "证件照仅能在本地开发环境上传。" }, { status: 404 });
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) {
    return Response.json({ error: "无法保存证件照。" }, { status: 403 });
  }
  try {
    if (new URL(origin).host !== host) {
      return Response.json({ error: "无法保存证件照。" }, { status: 403 });
    }
  } catch {
    return Response.json({ error: "无法保存证件照。" }, { status: 403 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "请选择要上传的证件照。" }, { status: 400 });
  }
  const memberId = form.get("memberId");
  const file = form.get("file");
  if (typeof memberId !== "string" || !members.has(memberId) || !(file instanceof File)) {
    return Response.json({ error: "请选择要上传的证件照。" }, { status: 400 });
  }

  try {
    const avatar = await saveMemberAvatar(memberId, new Uint8Array(await file.arrayBuffer()));
    return Response.json({ avatar });
  } catch (error) {
    const message = error instanceof Error ? error.message : "证件照没有保存成功。";
    const status = message === "未找到该成员" ? 404 : 400;
    return Response.json({ error: message }, { status });
  }
}
