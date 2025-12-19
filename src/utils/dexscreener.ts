import axios from "axios";

const BASE_URL = "https://api.dexscreener.com/latest/dex/tokens";

export async function getDexLiquidity(tokenAddress: string) {
  const url = `${BASE_URL}/${tokenAddress}`;
  const res = await axios.get(url);
  return res.data?.pairs ?? [];
}
