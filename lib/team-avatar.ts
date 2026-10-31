/** 证件照上传的共享约束。服务端写文件的逻辑在 lib/team-avatar-store.ts。 */

export const TEAM_AVATAR_MAX_BYTES = 4 * 1024 * 1024;

export type TeamAvatarExt = "jpg" | "png" | "webp";

/** 按文件头判断格式，不信任浏览器报的 MIME。 */
export function detectImageExt(bytes: Uint8Array): TeamAvatarExt | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "png";
  }
  if (bytes.length >= 12 && bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) {
    const mark = String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11]);
    if (mark === "WEBP") return "webp";
  }
  return null;
}

/**
 * 在 data/team.ts 源码里写入或替换某个成员的 avatar。
 * 只改该成员对象，路径必须是 /images/team/ 下的文件。
 */
export function upsertMemberAvatar(source: string, memberId: string, avatarPath: string): string {
  if (!/^[a-z0-9-]+$/.test(memberId)) throw new Error("成员编号无效");
  if (!/^\/images\/team\/[a-z0-9-]+\.(jpg|png|webp)$/.test(avatarPath)) throw new Error("头像路径无效");

  const idNeedle = `id: "${memberId}"`;
  const start = source.indexOf(idNeedle);
  if (start < 0 || source.indexOf(idNeedle, start + idNeedle.length) !== -1) {
    throw new Error("未找到该成员");
  }

  const objStart = source.lastIndexOf("{", start);
  if (objStart < 0) throw new Error("成员记录不完整");

  let depth = 0;
  let objEnd = -1;
  for (let i = objStart; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        objEnd = i;
        break;
      }
    }
  }
  if (objEnd < 0) throw new Error("成员记录不完整");

  let block = source.slice(objStart, objEnd + 1);
  const avatarField = /avatar:\s*"[^"]*"/;
  if (avatarField.test(block)) {
    block = block.replace(avatarField, `avatar: "${avatarPath}"`);
  } else {
    block = block.replace(idNeedle, `${idNeedle},\n    avatar: "${avatarPath}"`);
  }

  return source.slice(0, objStart) + block + source.slice(objEnd + 1);
}
