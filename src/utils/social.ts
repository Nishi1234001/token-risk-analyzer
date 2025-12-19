import { dedupePosts } from "./dedupe";
import { scoreSentiment } from "./sentiment";
import { computeVelocity } from "./velocity";
import { computeZScore } from "./zscore";
import { SocialSnapshot } from "../schemas/social";

export function analyzeSocial(posts: any[]): SocialSnapshot {
  const unique = dedupePosts(posts);

  const scored = unique.map(p => {
    const text = `${p.title || ""} ${p.body || ""}`;
    const s = scoreSentiment(text);

    return {
      title: p.title,
      url: p.url,
      sentiment: s.label,
      score: s.score,
      published_at: p.published_at
    };
  });

  const velocity = computeVelocity(unique);
  const z = computeZScore(velocity);

  return {
    top_posts: scored.slice(0, 5),
    mention_count: unique.length,
    velocity_per_min: velocity,
    z_score: z,
    anomaly: z !== null ? z > 2 : null
  };
}
