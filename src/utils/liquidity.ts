import { LiquiditySnapshot } from "../schemas/liquidity";

export function analyzeLiquidity(pairs: any[]): LiquiditySnapshot {
  if (!pairs || pairs.length === 0) {
    return {
      top_pairs: [],
      total_liquidity_usd: 0,
      concentration_ratio: null,
      risk_label: null
    };
  }

  // sort by liquidity
  const sorted = pairs
    .filter(p => p.liquidity?.usd)
    .sort((a, b) => b.liquidity.usd - a.liquidity.usd);

  const topPairs = sorted.slice(0, 3).map(p => ({
    dex: p.dexId,
    pair_address: p.pairAddress,
    liquidity_usd: p.liquidity.usd,
    volume_24h: p.volume?.h24 ?? 0
  }));

  const totalLiquidity = sorted.reduce(
    (sum, p) => sum + (p.liquidity?.usd ?? 0),
    0
  );

  const topLiquidity = topPairs[0]?.liquidity_usd ?? 0;
  const concentration =
    totalLiquidity > 0 ? topLiquidity / totalLiquidity : null;

  return {
    top_pairs: topPairs,
    total_liquidity_usd: totalLiquidity,
    concentration_ratio: concentration,
    risk_label: deriveRisk(concentration)
  };
}

function deriveRisk(ratio: number | null): "LOW" | "MEDIUM" | "HIGH" | null {
  if (ratio === null) return null;
  if (ratio > 0.8) return "HIGH";
  if (ratio > 0.5) return "MEDIUM";
  return "LOW";
}
