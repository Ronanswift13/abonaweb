import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { detectImageExt, TEAM_AVATAR_MAX_BYTES, upsertMemberAvatar, type TeamAvatarExt } from "@/lib/team-avatar";

const EXTENSIONS: TeamAvatarExt[] = ["jpg", "png", "webp"];

/**
 * 把证件照写到 public/images/team/{id}.{ext}，并在 data/team.ts 记下 avatar。
 * 只应由本地开发的上传接口调用。失败时不留下半截记录。
 */
export async function saveMemberAvatar(memberId: string, bytes: Uint8Array): Promise<string> {
  if (!/^[a-z0-9-]+$/.test(memberId)) throw new Error("成员编号无效");
  if (bytes.byteLength === 0 || bytes.byteLength > TEAM_AVATAR_MAX_BYTES) {
    throw new Error("证件照需小于 4MB。");
  }

  const ext = detectImageExt(bytes);
  if (!ext) throw new Error("请上传 JPG、PNG 或 WebP 证件照。");

  const root = process.cwd();
  const dir = path.resolve(root, "public/images/team");
  const teamFile = path.resolve(root, "data/team.ts");
  const filename = `${memberId}.${ext}`;
  const full = path.resolve(dir, filename);
  if (path.dirname(full) !== dir) throw new Error("头像路径无效");

  const avatarPath = `/images/team/${filename}`;
  await mkdir(dir, { recursive: true });
  await writeFile(full, bytes);

  try {
    const source = await readFile(teamFile, "utf8");
    const next = upsertMemberAvatar(source, memberId, avatarPath);
    if (next !== source) await writeFile(teamFile, next);
  } catch (error) {
    await unlink(full).catch(() => undefined);
    if (error instanceof Error && /成员|路径|编号/.test(error.message)) throw error;
    throw new Error("证件照没有保存成功。");
  }

  await Promise.all(
    EXTENSIONS.filter((item) => item !== ext).map(async (item) => {
      await unlink(path.join(dir, `${memberId}.${item}`)).catch((error: NodeJS.ErrnoException) => {
        if (error.code !== "ENOENT") throw new Error("证件照没有保存成功。");
      });
    }),
  );

  return avatarPath;
}
