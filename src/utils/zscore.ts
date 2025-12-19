export function computeZScore(
  value: number | null,
  historicalAvg = 2.0, // DOCUMENTED FAKE BASELINE
  historicalStd = 1.0
) {
  if (value === null) return null;
  return (value - historicalAvg) / historicalStd;
}
