export async function getWeatherAnalytics(
  getAccessTokenSilently
) {
  const token = await getAccessTokenSilently({
    authorizationParams: {
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    },
  });

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/weather`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorDetails = await response.text();

    console.error(
      "Weather API error:",
      response.status,
      errorDetails
    );

    throw new Error(
      `Unable to retrieve weather data (${response.status})`
    );
  }

  return response.json();
}