import { getCityCodes } from "../utils/cities.js";

import {
  fetchWeatherByCityId,
} from "../services/weatherService.js";

import {
  calculateComfortIndex,
} from "../services/comfortService.js";

import {
  rankCities,
} from "../utils/ranking.js";

export async function getWeatherAnalytics(
  req,
  res,
  next
) {
  try {
    const cityCodes =
      getCityCodes();

    const results =
      await Promise.allSettled(
        cityCodes.map(
          (cityId) =>
            fetchWeatherByCityId(
              cityId
            )
        )
      );

    const cities = [];
    const failedCities = [];

    results.forEach(
      (result, index) => {
        if (
          result.status ===
          "fulfilled"
        ) {
          const weather =
            result.value;

          const comfort =
            calculateComfortIndex(
              weather
            );

          cities.push({
            cityId:
              weather.id,

            cityName:
              weather.name,

            country:
              weather.sys?.country,

            weatherDescription:
              weather.weather?.[0]
                ?.description ||
              "Unknown",

            temperature:
              weather.main?.temp,

            humidity:
              weather.main?.humidity,

            windSpeed:
              weather.wind?.speed,

            cloudiness:
              weather.clouds?.all,

            pressure:
              weather.main?.pressure,

            visibility:
              weather.visibility,

            comfortScore:
              comfort.score,

            comfortComponents:
              comfort.components,
          });
        } else {
          failedCities.push({
            cityId:
              cityCodes[index],

            error:
              "Unable to retrieve weather data",
          });
        }
      }
    );

    const rankedCities =
      rankCities(cities);

    res.json({
      success: true,

      count:
        rankedCities.length,

      failedCount:
        failedCities.length,

      updatedAt:
        new Date().toISOString(),

      cities:
        rankedCities,

      failedCities,
    });
  } catch (error) {
    next(error);
  }
}