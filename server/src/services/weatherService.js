import axios from "axios";

import { config } from "../config/env.js";

import {
  getCachedWeather,
  setCachedWeather,
} from "./cacheService.js";

const OPENWEATHER_URL =
  "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeatherByCityId(
  cityId
) {
  const cached =
    getCachedWeather(
      cityId
    );

  if (cached) {
    return {
      data: cached,
      cacheStatus: "HIT",
    };
  }

  const response =
    await axios.get(
      OPENWEATHER_URL,
      {
        params: {
          id: cityId,

          appid:
            config.openWeatherApiKey,

          units: "metric",
        },

        timeout: 10000,
      }
    );

  setCachedWeather(
    cityId,
    response.data
  );

  return {
    data: response.data,
    cacheStatus: "MISS",
  };
}