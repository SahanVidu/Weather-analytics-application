import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function WeatherChart({
  cities,
}) {
  const data = cities.map((city) => ({
    name: city.cityName,
    temperature: city.temperature,
  }));

  return (
    <div className="mb-8 h-96 rounded-xl bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Temperature by City
      </h2>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >
        <BarChart data={data}>
          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="temperature" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}