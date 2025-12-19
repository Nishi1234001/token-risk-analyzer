import express from "express";
import cors from "cors";
import "dotenv/config";

import healthRoute from "./routes/health";
import contractRoute from "./routes/contracts";
import socialRoute from "./routes/social";
import liquidityRoute from "./routes/liquidity";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/health", healthRoute);
app.use("/v1/contracts", contractRoute);
app.use("/v1/liquidity", liquidityRoute);
app.use("/v1/social", socialRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
