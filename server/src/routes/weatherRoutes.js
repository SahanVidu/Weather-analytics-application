import express from "express";

import {
  getWeatherAnalytics,
} from "../controllers/weatherController.js";

const router = express.Router();

router.get(
  "/",
  getWeatherAnalytics
);

export default router;