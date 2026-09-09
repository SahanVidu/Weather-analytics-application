export default function CityCard({ city }) {
  return (
    <article className="city-card">
      <div className="city-card__top">
        <span className="city-card__rank">
          Rank #{city.rank}
        </span>

        <div className="city-card__score">
          <span>Comfort</span>
          <strong>
            {city.comfortScore}
          </strong>
        </div>
      </div>

      <h2>
        {city.cityName}
      </h2>

      <p className="city-card__description">
        {city.weatherDescription}
      </p>

      <div className="city-card__details">
        <div className="city-card__detail">
          <span>
            Temperature
          </span>
          <strong>
            {city.temperature}°C
          </strong>
        </div>

        <div className="city-card__detail">
          <span>
            Humidity
          </span>
          <strong>
            {city.humidity}%
          </strong>
        </div>

        <div className="city-card__detail">
          <span>
            Wind
          </span>
          <strong>
            {city.windSpeed} m/s
          </strong>
        </div>

        <div className="city-card__detail">
          <span>
            Cloudiness
          </span>
          <strong>
            {city.cloudiness}%
          </strong>
        </div>
      </div>
    </article>
  );
}