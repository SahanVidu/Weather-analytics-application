import express from "express";

import {
  getWeatherAnalytics,
} from "../controllers/weatherController.js";

import {
  validateAccessToken,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.get(
  "/",
  validateAccessToken,
  getWeatherAnalytics
);

export default router;