import { Router } from "express";
import { createEmptyResponse } from "../utils/response";
import { ContractTruth } from "../schemas/contractTruth";
import { getSourceCode, getABI } from "../utils/etherscan";
import { isProxy } from "../utils/proxy";
import { getRuntimeCodeHash } from "../utils/rpc";
import { scanControls } from "../utils/abiScan";
import { getSupplyActivity } from "../utils/supply";

const router = Router();

router.post("/truth:analyze", async (req, res) => {
  const response = createEmptyResponse<ContractTruth>();
  const address = req.body?.address;

  if (!address) {
    response.errors.push("address_required");
    return res.json(response);
  }

  try {
    const source = await getSourceCode(address);
    const abi = await getABI(address);
    const proxyResult = await isProxy(address);
    const runtimeCodeHash = await getRuntimeCodeHash(address);
    const supplyActivity = await getSupplyActivity(address);

    response.data = {
      proven: {
        verified_source: Boolean(source?.SourceCode),
        is_proxy: proxyResult,
        runtime_code_hash: runtimeCodeHash,
        controls: abi
          ? scanControls(abi)
          : { mint: null, burn: null, pause: null, blacklist: null },
        supply_activity: supplyActivity
      }
    };

    
    response.evidence.push({
      source: "etherscan",
      address
    });

    
    if (!abi) {
      response.warnings.push("abi_missing");
    }

    if (proxyResult === null) {
      response.warnings.push("proxy_detection_skipped");
    }

    if (!supplyActivity) {
      response.warnings.push("supply_activity_unavailable");
    }

    if (!source?.SourceCode) {
      response.warnings.push("source_code_unverified");
    }

  } catch (err) {
    response.errors.push("analysis_failed");
  }

  return res.json(response);
});

export default router;
