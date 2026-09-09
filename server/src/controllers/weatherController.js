import { getCityCodes } from "../utils/cities.js";
import { fetchWeatherByCityId } from "../services/weatherService.js";

export async function getWeatherData(
  req,
  res,
  next
) {
  try {
    const cityCodes = getCityCodes();

    const results =
      await Promise.allSettled(
        cityCodes.map((cityId) =>
          fetchWeatherByCityId(cityId)
        )
      );

    const cities = [];
    const failedCities = [];

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        const weather = result.value;

        cities.push({
          cityId: weather.id,

          cityName: weather.name,

          country:
            weather.sys?.country,

          weatherDescription:
            weather.weather?.[0]
              ?.description || "Unknown",

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
        });
      } else {
        failedCities.push({
          cityId: cityCodes[index],
          error:
            "Unable to retrieve weather data",
        });
      }
    });

    res.json({
      success: true,

      count: cities.length,

      failedCount:
        failedCities.length,

      cities,

      failedCities,
    });
  } catch (error) {
    next(error);
  }
}