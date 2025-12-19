export function computeVelocity(posts: any[]) {
  if (posts.length < 2) return null;

  const times = posts
    .map(p => new Date(p.published_at).getTime())
    .sort();

  const durationMin = (times[times.length - 1] - times[0]) / 60000;
  if (durationMin <= 0) return null;

  return posts.length / durationMin;
}
