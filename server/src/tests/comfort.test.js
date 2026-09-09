import {
  describe,
  it,
  expect,
} from "vitest";

import {
  calculateComfortIndex,
} from "../services/comfortService.js";

describe(
  "Comfort Index",
  () => {
    it(
      "returns 100 for ideal conditions",
      () => {
        const weather = {
          main: {
            temp: 24,
            humidity: 50,
          },

          wind: {
            speed: 3,
          },

          clouds: {
            all: 30,
          },
        };

        const result =
          calculateComfortIndex(
            weather
          );

        expect(
          result.score
        ).toBe(100);
      }
    );

    it(
      "keeps score between 0 and 100",
      () => {
        const weather = {
          main: {
            temp: 50,
            humidity: 100,
          },

          wind: {
            speed: 20,
          },

          clouds: {
            all: 100,
          },
        };

        const result =
          calculateComfortIndex(
            weather
          );

        expect(
          result.score
        ).toBeGreaterThanOrEqual(0);

        expect(
          result.score
        ).toBeLessThanOrEqual(100);
      }
    );
  }
);