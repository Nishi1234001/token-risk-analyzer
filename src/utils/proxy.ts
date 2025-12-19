import axios from "axios";

const RPC_URL = "https://eth.llamarpc.com";


const SLOT =
  "0x360894A13BA1A3210667C828492DB98DCA3E2076CC3735A920A3CA505D382BBC";

export async function isProxy(address: string): Promise<boolean> {
  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getStorageAt",
    params: [address, SLOT, "latest"]
  };

  const res = await axios.post(RPC_URL, payload);
  return res.data.result !== "0x0000000000000000000000000000000000000000000000000000000000000000";
}
