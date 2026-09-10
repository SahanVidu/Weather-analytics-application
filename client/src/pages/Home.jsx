import LoginButton from "../components/LoginButton.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";

const signals = [
  ["01", "Compare cities", "See the same weather story across every location."],
  ["02", "Follow comfort", "Turn temperature, wind, and humidity into one clear score."],
  ["03", "Act with context", "Use the chart and rankings to choose your next destination."],
];

export default function Home() {
  return (
    <main className="home-shell">
      <div className="home-frame">
        <header className="home-nav">
          <a className="home-brand" href="/" aria-label="Fidenz Weather Analytics home">
            <span className="home-brand__mark" aria-hidden="true">F</span>
            <span>Fidenz / weather</span>
          </a>
          <div className="home-nav__actions">
            <span className="home-nav__status"><span /> Live city conditions</span>
            <ThemeToggle />
          </div>
        </header>

        <section className="home-hero">
          <div className="home-hero__copy">
            <p className="eyebrow">A clearer forecast for everywhere</p>
            <h1>Find the places that feel right.</h1>
            <p className="home-hero__intro">
              One calm view of the weather that matters. Compare live conditions,
              rank city comfort, and make your next move with confidence.
            </p>
            <div className="home-hero__actions">
              <LoginButton />
              <a className="home-text-link" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a>
            </div>
            <p className="home-hero__footnote">Private workspace · Live data · Built for quick decisions</p>
          </div>

          <div className="weather-scene" aria-label="Illustration of a clear morning weather report" role="img">
            <div className="weather-scene__sun" />
            <div className="weather-scene__cloud weather-scene__cloud--one" />
            <div className="weather-scene__cloud weather-scene__cloud--two" />
            <div className="weather-scene__horizon" />
            <div className="weather-report">
              <div className="weather-report__top"><span>Today, 08:42</span><span>● synced</span></div>
              <strong>18°</strong>
              <span className="weather-report__place">Comfortable morning</span>
              <div className="weather-report__details"><span>Humidity 54%</span><span>Wind 3 m/s</span></div>
            </div>
            <span className="weather-scene__label">A better read on the day</span>
          </div>
        </section>

        <section className="home-signals" id="how-it-works" aria-label="How the weather analytics dashboard works">
          {signals.map(([number, title, description]) => (
            <article className="home-signal" key={number}>
              <span className="home-signal__number">{number}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
