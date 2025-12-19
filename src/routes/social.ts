import { Router } from "express";
import { createEmptyResponse } from "../utils/response";
import { getSocialPosts } from "../utils/cryptopanic";
import { analyzeSocial } from "../utils/social";

const router = Router();

router.post("/snapshot", async (req, res) => {
  const response = createEmptyResponse<any>();
  const symbol = req.body?.symbol;

  if (!symbol) {
    response.errors.push("symbol_required");
    return res.json(response);
  }

  try {
    const posts = await getSocialPosts(symbol);

    if (!posts || posts.length === 0) {
      response.data = null;
      response.warnings.push("no_social_data");
    } else {
      response.data = analyzeSocial(posts);

     
      response.evidence.push({
        source: "cryptopanic",
        symbol
      });

      
      if (response.data?.velocity === null) {
        response.warnings.push("velocity_unavailable");
      }

      if (response.data?.z_score === null) {
        response.warnings.push("sentiment_baseline_unavailable");
      }
    }

  } catch (err) {
    response.data = null;
    response.errors.push("social_fetch_failed");
  }

  return res.json(response);
});

export default router;
