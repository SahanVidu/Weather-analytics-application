import {
  describe,
  it,
  expect,
  beforeEach,
} from "vitest";

import {
  getCachedWeather,
  setCachedWeather,
  getCacheStatus,
  clearWeatherCache,
} from "../services/cacheService.js";

describe(
  "Weather Cache",
  () => {
    beforeEach(() => {
      clearWeatherCache();
    });

    it(
      "returns null on cache miss",
      () => {
        const result =
          getCachedWeather(
            123
          );

        expect(result)
          .toBeNull();
      }
    );

    it(
      "returns cached data on hit",
      () => {
        const weather = {
          id: 123,
          name: "Test City",
        };

        setCachedWeather(
          123,
          weather
        );

        const result =
          getCachedWeather(
            123
          );

        expect(result)
          .toEqual(weather);
      }
    );

    it(
      "reports cache statistics",
      () => {
        setCachedWeather(
          123,
          {
            id: 123,
          }
        );

        getCachedWeather(123);

        const status =
          getCacheStatus();

        expect(status.hits)
          .toBe(1);

        expect(
          status.entries
        ).toBe(1);
      }
    );
  }
);