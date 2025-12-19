import axios from "axios";

const BASE = "https://api.etherscan.io/api";

export async function getSupplyActivity(address: string) {
  const url = `${BASE}?module=logs&action=getLogs&address=${address}&apikey=${process.env.ETHERSCAN_API_KEY}`;
  const res = await axios.get(url);

  if (!res.data.result) return null;

  let mint = 0;
  let burn = 0;

  for (const log of res.data.result) {
    if (log.topics?.length >= 3) {
      const from = log.topics[1];
      const to = log.topics[2];

      if (from === "0x0000000000000000000000000000000000000000000000000000000000000000") mint++;
      if (to === "0x0000000000000000000000000000000000000000000000000000000000000000") burn++;
    }
  }

  return {
    mint_events: mint,
    burn_events: burn
  };
}
