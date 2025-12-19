import axios from "axios";

const BASE_URL = "https://api.etherscan.io/api";

export async function getSourceCode(address: string) {
  const url = `${BASE_URL}?module=contract&action=getsourcecode&address=${address}&apikey=${process.env.ETHERSCAN_API_KEY}`;
  const res = await axios.get(url);
  return res.data.result[0];
}

export async function getABI(address: string) {
  const url = `${BASE_URL}?module=contract&action=getabi&address=${address}&apikey=${process.env.ETHERSCAN_API_KEY}`;
  const res = await axios.get(url);
  if (res.data.status !== "1") return null;
  return JSON.parse(res.data.result);
}
