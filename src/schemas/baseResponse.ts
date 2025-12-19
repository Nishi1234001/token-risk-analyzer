export interface Evidence {
  source: "etherscan" | "dexscreener" | "cryptopanic";
  address?: string;
  symbol?: string;
}

export interface BaseResponse<T> {
  request_id: string;
  as_of: string;
  data: T | null;
 evidence: Evidence[];
  warnings: string[];
  errors: string[];
}
