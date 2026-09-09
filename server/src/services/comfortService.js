const clamp = (
  value,
  min = 0,
  max = 100
) => {
  return Math.min(
    max,
    Math.max(min, value)
  );
};

function calculateTemperatureScore(
  temperature
) {
  return clamp(
    100 -
      Math.abs(
        temperature - 24
      ) * 5
  );
}

function calculateHumidityScore(
  humidity
) {
  return clamp(
    100 -
      Math.abs(
        humidity - 50
      ) * 2
  );
}

function calculateWindScore(
  windSpeed
) {
  return clamp(
    100 -
      Math.abs(
        windSpeed - 3
      ) * 20
  );
}

function calculateCloudinessScore(
  cloudiness
) {
  return clamp(
    100 -
      Math.abs(
        cloudiness - 30
      ) * 2
  );
}

export function calculateComfortIndex(
  weather
) {
  const temperature =
    weather.main.temp;

  const humidity =
    weather.main.humidity;

  const windSpeed =
    weather.wind.speed;

  const cloudiness =
    weather.clouds.all;

  const temperatureScore =
    calculateTemperatureScore(
      temperature
    );

  const humidityScore =
    calculateHumidityScore(
      humidity
    );

  const windScore =
    calculateWindScore(
      windSpeed
    );

  const cloudinessScore =
    calculateCloudinessScore(
      cloudiness
    );

  const score =
    temperatureScore * 0.40 +
    humidityScore * 0.30 +
    windScore * 0.20 +
    cloudinessScore * 0.10;

  return {
    score: Number(
      clamp(score).toFixed(2)
    ),

    components: {
      temperature:
        Number(
          temperatureScore.toFixed(2)
        ),

      humidity:
        Number(
          humidityScore.toFixed(2)
        ),

      wind:
        Number(
          windScore.toFixed(2)
        ),

      cloudiness:
        Number(
          cloudinessScore.toFixed(2)
        ),
    },
  };
}