import { Router } from "express";
import { createEmptyResponse } from "../utils/response";
import { getDexLiquidity } from "../utils/dexscreener";
import { analyzeLiquidity } from "../utils/liquidity";

const router = Router();

router.post("/snapshot", async (req, res) => {
  const response = createEmptyResponse<any>();
  const address = req.body?.address;

  if (!address) {
    response.errors.push("address_required");
    return res.json(response);
  }

  try {
    const pairs = await getDexLiquidity(address);

    if (!pairs || pairs.length === 0) {
      response.data = null;
      response.warnings.push("no_dex_pairs_found");
    } else {
      response.data = analyzeLiquidity(pairs);

      
      response.evidence.push({
        source: "dexscreener",
        address
      });
    }

   
    response.warnings.push("cex_orderbooks_skipped");

  } catch (err) {
    response.data = null;
    response.errors.push("liquidity_fetch_failed");
  }

  return res.json(response);
});

export default router;
