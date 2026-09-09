import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const citiesPath = path.resolve(
  __dirname,
  "../../../cities.json"
);

export function getCityCodes() {
  const fileContent = fs.readFileSync(
    citiesPath,
    "utf-8"
  );

  const data = JSON.parse(fileContent);

  // Your cities.json structure is: { List: [...] }
  const cities = data.List;

  if (!Array.isArray(cities)) {
    throw new Error(
      "Invalid cities.json format. Expected a List array."
    );
  }

  const cityCodes = cities
    .map((city) => city.CityCode)
    .filter(Boolean)
    .map(Number);

  if (cityCodes.length < 10) {
    throw new Error(
      `At least 10 cities are required. Found ${cityCodes.length}.`
    );
  }

  return cityCodes;
}