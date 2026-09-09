import dotenv from "dotenv";

dotenv.config();

const requiredEnv = [
  "OPENWEATHER_API_KEY",
  "CLIENT_ORIGIN",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(
      `Missing required environment variable: ${key}`
    );
  }
}

export const config = {
  port: Number(process.env.PORT) || 5000,

  clientOrigin:
    process.env.CLIENT_ORIGIN,

  openWeatherApiKey:
    process.env.OPENWEATHER_API_KEY,

  auth0Domain:
    process.env.AUTH0_DOMAIN,

  auth0Audience:
    process.env.AUTH0_AUDIENCE,
};