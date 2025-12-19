import axios from "axios";
import * as crypto from "crypto";

const RPC_URL = "https://eth.llamarpc.com";

export async function getRuntimeCodeHash(address: string) {
  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getCode",
    params: [address, "latest"]
  };

  const res = await axios.post(RPC_URL, payload);
  const code = res.data.result;

  if (!code || code === "0x") return null;

  return crypto.createHash("sha256").update(code).digest("hex");
}
