export default function LoadingState() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />

        <p className="text-gray-600">
          Loading weather data...
        </p>
      </div>
    </div>
  );
}