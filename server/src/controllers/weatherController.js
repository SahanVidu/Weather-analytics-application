import { getCityCodes } from "../utils/cities.js";
import { fetchWeatherByCityId } from "../services/weatherService.js";
import { calculateComfortIndex } from "../services/comfortService.js";
import { rankCities } from "../utils/ranking.js";

export async function getWeatherAnalytics(req, res, next) {
  try {
    const cityCodes = getCityCodes();

    const results = await Promise.allSettled(
      cityCodes.map((cityId) =>
        fetchWeatherByCityId(cityId)
      )
    );

    const cities = [];
    const failedCities = [];

    results.forEach((result, index) => {
      const cityId = cityCodes[index];

      if (result.status === "rejected") {
        console.error(
          `Weather request failed for city ${cityId}:`,
          result.reason?.response?.data ||
            result.reason?.message
        );

        failedCities.push({
          cityId,
          error: "Unable to retrieve weather data",
        });

        return;
      }

      const weather = result.value.data;

      // Validate OpenWeather response before processing
      if (
        !weather ||
        !weather.main ||
        typeof weather.main.temp !== "number" ||
        typeof weather.main.humidity !== "number" ||
        !weather.wind ||
        typeof weather.wind.speed !== "number" ||
        !weather.clouds ||
        typeof weather.clouds.all !== "number"
      ) {
        console.error(
          `Invalid weather data for city ${cityId}:`,
          weather
        );

        failedCities.push({
          cityId,
          error: "Invalid weather data received",
        });

        return;
      }

      const comfort =
        calculateComfortIndex(weather);

      cities.push({
        cityId: weather.id,
        cityName: weather.name,
        country: weather.sys?.country,

        weatherDescription:
          weather.weather?.[0]?.description ||
          "Unknown",

        temperature: weather.main.temp,
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed,
        cloudiness: weather.clouds.all,
        pressure: weather.main.pressure,
        visibility: weather.visibility,

        comfortScore: comfort.score,
        comfortComponents: comfort.components,

        cacheStatus: result.value.cacheStatus,
      });
    });

    const rankedCities = rankCities(cities);

    res.json({
      success: true,
      count: rankedCities.length,
      failedCount: failedCities.length,
      updatedAt: new Date().toISOString(),
      cities: rankedCities,
      failedCities,
    });
  } catch (error) {
    next(error);
  }
}