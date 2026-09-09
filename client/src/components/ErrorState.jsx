export default function ErrorState({ message }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
      <h2 className="font-semibold">
        Unable to load weather data
      </h2>

      <p className="mt-1 text-sm">
        {message}
      </p>
    </div>
  );
}