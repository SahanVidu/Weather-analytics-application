import express from "express";

import {
  getCacheStatus,
} from "../services/cacheService.js";

const router =
  express.Router();

router.get(
  "/status",
  (req, res) => {
    res.json({
      success: true,

      cache:
        getCacheStatus(),
    });
  }
);

export default router;