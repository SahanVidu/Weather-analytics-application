export default function CityCard({ city }) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
          Rank #{city.rank}
        </span>

        <div className="text-right">
          <p className="text-xs text-gray-500">
            Comfort Score
          </p>

          <p className="text-2xl font-bold">
            {city.comfortScore}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900">
        {city.cityName}
      </h2>

      <p className="mt-1 capitalize text-gray-500">
        {city.weatherDescription}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500">
            Temperature
          </p>

          <p className="font-semibold">
            {city.temperature}°C
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500">
            Humidity
          </p>

          <p className="font-semibold">
            {city.humidity}%
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500">
            Wind
          </p>

          <p className="font-semibold">
            {city.windSpeed} m/s
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500">
            Cloudiness
          </p>

          <p className="font-semibold">
            {city.cloudiness}%
          </p>
        </div>
      </div>
    </article>
  );
}