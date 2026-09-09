import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth0 } from "@auth0/auth0-react";

import {
  getWeatherAnalytics,
} from "../services/weatherApi.js";

import CityCard from "../components/CityCard.jsx";

import LoadingState from "../components/LoadingState.jsx";

import ErrorState from "../components/ErrorState.jsx";

import LogoutButton from "../components/LogoutButton.jsx";

import WeatherChart from "../components/WeatherChart.jsx";

export default function Dashboard() {
  const {
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const [cities, setCities] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState("score");

  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getWeatherAnalytics(
            getAccessTokenSilently
          );

        setCities(data.cities || []);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to retrieve weather data from the server."
        );
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [getAccessTokenSilently]);

  const filteredCities = useMemo(() => {
    const filtered = cities.filter((city) =>
      city.cityName
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === "score") {
        return b.comfortScore - a.comfortScore;
      }

      if (sortBy === "temperature") {
        return b.temperature - a.temperature;
      }

      if (sortBy === "humidity") {
        return b.humidity - a.humidity;
      }

      return a.rank - b.rank;
    });
  }, [cities, search, sortBy]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 p-5">
        <ErrorState message={error} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Weather Analytics
            </h1>

            <p className="mt-1 text-gray-600">
              Comfort Index Dashboard
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-gray-600 md:block">
              {user?.email}
            </span>

            <LogoutButton />
          </div>
        </header>

        {/* Search and Sort */}
        <section className="mb-6 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row">

            <input
              type="text"
              placeholder="Search city..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="rounded-lg border border-gray-300 px-4 py-3"
            >
              <option value="score">
                Sort by Comfort Score
              </option>

              <option value="temperature">
                Sort by Temperature
              </option>

              <option value="humidity">
                Sort by Humidity
              </option>

              <option value="rank">
                Sort by Rank
              </option>
            </select>

          </div>
        </section>

        {/* Weather Chart */}
        <WeatherChart
          cities={filteredCities}
        />

        {/* City Cards */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCities.map((city) => (
            <CityCard
              key={city.cityId}
              city={city}
            />
          ))}
        </section>

      </div>
    </main>
  );
}