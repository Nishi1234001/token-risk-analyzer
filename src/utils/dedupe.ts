import crypto from "crypto";

export function dedupePosts(posts: any[]) {
  const seen = new Set<string>();

  return posts.filter(p => {
    const text = (p.title || "") + (p.body || "");
    const hash = crypto.createHash("sha256").update(text).digest("hex");

    if (seen.has(hash)) return false;
    seen.add(hash);
    return true;
  });
}
