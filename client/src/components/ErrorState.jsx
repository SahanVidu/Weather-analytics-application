export default function ErrorState({ message }) {
  return (
    <div className="error-state">
      <h2>
        Unable to load weather data
      </h2>

      <p>
        {message}
      </p>
    </div>
  );
}