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
import ThemeToggle from "../components/ThemeToggle.jsx";

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
    return (
      <main className="dashboard-shell dashboard-shell--loading">
        <LoadingState />
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard-shell dashboard-shell--loading">
        <ErrorState message={error} />
      </main>
    );
  }

  const averageTemperature = cities.length
    ? Math.round(
        (cities.reduce((total, city) => total + city.temperature, 0) /
          cities.length) * 10
      ) / 10
    : 0;

  const averageComfort = cities.length
    ? Math.round(
        cities.reduce((total, city) => total + city.comfortScore, 0) /
          cities.length
      )
    : 0;

  return (
    <main className="dashboard-shell">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="brand-lockup">
            <p className="eyebrow">Live conditions</p>
            <h1>Weather analytics</h1>
            <p className="dashboard-subtitle">
              Compare comfort across your tracked cities at a glance.
            </p>
          </div>

          <div className="account-actions">
            <span className="account-email">{user?.email}</span>
            <ThemeToggle />
            <LogoutButton />
          </div>
        </header>

        <nav className="dashboard-nav" aria-label="Dashboard sections">
          <a href="#city-rankings">City rankings</a>
          <a href="#weather-chart">Weather chart</a>
        </nav>

        <section className="metrics-grid" aria-label="Weather summary">
          <div className="metric-card">
            <span className="metric-label">Cities tracked</span>
            <strong>{cities.length}</strong>
            <span className="metric-detail">Across your watchlist</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Average comfort</span>
            <strong>{averageComfort}</strong>
            <span className="metric-detail">Out of 100 points</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Average temperature</span>
            <strong>{averageTemperature}°</strong>
            <span className="metric-detail">Current city average</span>
          </div>
        </section>

        <section className="control-panel" aria-label="Filter cities">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Explore the list</p>
              <h2>Find a city</h2>
            </div>
            <span className="result-count">
              {filteredCities.length} result{filteredCities.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="control-row">
            <input
              type="text"
              aria-label="Search cities"
              placeholder="Search by city name"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              aria-label="Sort cities"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
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

        <section id="weather-chart" className="chart-section" aria-labelledby="chart-title">
          <div className="section-heading section-heading--chart">
            <div>
              <p className="eyebrow">Visual comparison</p>
              <h2 id="chart-title">Temperature by city</h2>
            </div>
            <p className="section-note">Select a city below for the full snapshot.</p>
          </div>
          <WeatherChart cities={filteredCities} />
        </section>

        <section id="city-rankings" className="rankings-section" aria-labelledby="rankings-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Comfort index</p>
              <h2 id="rankings-title">City rankings</h2>
            </div>
            <span className="section-note">Sorted by {sortBy}</span>
          </div>

          {filteredCities.length > 0 ? (
            <div className="city-grid">
              {filteredCities.map((city) => (
                <CityCard key={city.cityId} city={city} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No cities found</h3>
              <p>Try a different search term to see more weather data.</p>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}