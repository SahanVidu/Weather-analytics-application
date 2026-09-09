import express from "express";
import cors from "cors";
import helmet from "helmet";

import { config } from "./config/env.js";

import weatherRoutes from "./routes/weatherRoutes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: config.clientOrigin,
  })
);

app.use(express.json());

app.get(
  "/api/health",
  (req, res) => {
    res.json({
      status: "ok",
      service:
        "fidenz-weather-api",
      timestamp:
        new Date().toISOString(),
    });
  }
);

app.use(
  "/api/weather",
  weatherRoutes
);

app.use(
  (
    err,
    req,
    res,
    next
  ) => {
    console.error(err);

    res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });
  }
);

export default app;