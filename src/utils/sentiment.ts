const POSITIVE = ["bull", "moon", "pump", "growth", "positive"];
const NEGATIVE = ["rug", "scam", "dump", "hack", "exploit"];

export function scoreSentiment(text: string) {
  let score = 0;

  for (const word of POSITIVE) {
    if (text.toLowerCase().includes(word)) score++;
  }
  for (const word of NEGATIVE) {
    if (text.toLowerCase().includes(word)) score--;
  }

  if (score > 0) return { score, label: "POSITIVE" as const };
  if (score < 0) return { score, label: "NEGATIVE" as const };
  return { score: 0, label: "NEUTRAL" as const };
}
