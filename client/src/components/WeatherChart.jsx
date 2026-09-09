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
    <div className="weather-chart" role="img" aria-label="Bar chart comparing temperature by city">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 8 }}>
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis unit="°" tickLine={false} axisLine={false} width={42} />
            <Tooltip cursor={{ fill: "rgba(28, 78, 80, 0.08)" }} />
            <Bar dataKey="temperature" fill="#e07a5f" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="chart-empty">Search results will appear in the chart.</p>
      )}
    </div>
  );
}