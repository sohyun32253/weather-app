import type { ReactNode } from "react";
import { getWeatherLabel } from "@/lib/weatherCode";

interface WeatherCardProps {
  cityName: string;
  temperature: number;
  weatherCode: number;
  humidity: number;
  headerAction?: ReactNode;
}

export default function WeatherCard({
  cityName,
  temperature,
  weatherCode,
  humidity,
  headerAction,
}: WeatherCardProps) {
  const weatherLabel = getWeatherLabel(weatherCode);

  return (
    <article className="weather-card w-full rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:p-5 lg:p-6">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold md:text-2xl">{cityName}</h3>
          <p className="mt-1 text-sm text-muted md:text-base">{weatherLabel}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          {headerAction}
          <p className="text-3xl font-bold tabular-nums md:text-4xl">
            {Math.round(temperature)}°
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-3 text-sm md:text-base">
        <span className="text-muted">습도 {humidity}%</span>
        <span className="font-medium text-accent md:hidden">상세 보기 →</span>
      </div>
    </article>
  );
}
