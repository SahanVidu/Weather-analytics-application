import axios from "axios";
import { config } from "../config/env.js";

const OPENWEATHER_URL =
  "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeatherByCityId(cityId) {
  const response = await axios.get(
    OPENWEATHER_URL,
    {
      params: {
        id: cityId,
        appid: config.openWeatherApiKey,
        units: "metric",
      },

      timeout: 10000,
    }
  );

  return response.data;
}