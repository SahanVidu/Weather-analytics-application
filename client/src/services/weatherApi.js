export async function getWeatherAnalytics(
  getAccessTokenSilently
) {
  const token =
    await getAccessTokenSilently({
      authorizationParams: {
        audience:
          import.meta.env
            .VITE_AUTH0_AUDIENCE,
      },
    });

  const response =
    await fetch(
      `${import.meta.env.VITE_API_URL}/weather`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  if (!response.ok) {
    throw new Error(
      "Unable to retrieve weather data"
    );
  }

  return response.json();
}