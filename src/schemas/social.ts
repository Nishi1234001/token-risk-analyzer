export interface SocialSnapshot {
  top_posts: {
    title: string;
    url: string;
    sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
    score: number;
  }[];

  mention_count: number;
  velocity_per_min: number | null;
  z_score: number | null;
  anomaly: boolean | null;
}
