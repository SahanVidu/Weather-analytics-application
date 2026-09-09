import {
  auth,
} from "express-oauth2-jwt-bearer";

import {
  config,
} from "../config/env.js";

export const validateAccessToken =
  auth({
    issuerBaseURL:
      `https://${config.auth0Domain}`,

    audience:
      config.auth0Audience,
  });