const weatherCache =
  new Map();

const CACHE_TTL =
  5 * 60 * 1000;

let hits = 0;
let misses = 0;

export function getCachedWeather(
  cityId
) {
  const key =
    String(cityId);

  const entry =
    weatherCache.get(key);

  if (!entry) {
    misses++;
    return null;
  }

  if (
    Date.now() >=
    entry.expiresAt
  ) {
    weatherCache.delete(key);

    misses++;

    return null;
  }

  hits++;

  return entry.data;
}

export function setCachedWeather(
  cityId,
  data
) {
  const key =
    String(cityId);

  const now =
    Date.now();

  weatherCache.set(
    key,
    {
      data,

      createdAt: now,

      expiresAt:
        now + CACHE_TTL,
    }
  );
}

export function getCacheStatus() {
  const entries = [];

  for (
    const [
      cityId,
      entry,
    ] of weatherCache.entries()
  ) {
    const remaining =
      Math.max(
        0,
        entry.expiresAt -
          Date.now()
      );

    entries.push({
      cityId:
        Number(cityId),

      status:
        remaining > 0
          ? "HIT"
          : "EXPIRED",

      expiresInSeconds:
        Math.ceil(
          remaining / 1000
        ),
    });
  }

  return {
    ttlSeconds:
      CACHE_TTL / 1000,

    entries:
      entries.length,

    hits,

    misses,

    cities:
      entries,
  };
}

export function clearWeatherCache() {
  weatherCache.clear();

  hits = 0;
  misses = 0;
}