export interface LiquiditySnapshot {
  top_pairs: {
    dex: string;
    pair_address: string;
    liquidity_usd: number;
    volume_24h: number;
  }[];

  total_liquidity_usd: number;
  concentration_ratio: number | null;
  risk_label: "LOW" | "MEDIUM" | "HIGH" | null;
}
