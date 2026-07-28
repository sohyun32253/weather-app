import { formatShortDate } from "@/lib/weather";
import { getWeatherLabel } from "@/lib/weatherCode";
import type { DailyForecastItem } from "@/types/weather";

interface WeeklyForecastProps {
  days: DailyForecastItem[];
}

export default function WeeklyForecast({ days }: WeeklyForecastProps) {
  return (
    <section>
      <h3 className="mb-3 text-base font-semibold md:text-lg">주간 예보</h3>

      {/* 모바일: 세로 리스트 */}
      <div className="flex flex-col gap-2 lg:hidden">
        {days.map((day) => (
          <div
            key={day.date}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <p className="w-20 shrink-0 text-sm font-medium">
                {formatShortDate(day.date)}
              </p>
              <p className="truncate text-sm">{getWeatherLabel(day.weatherCode)}</p>
            </div>
            <p className="shrink-0 text-sm tabular-nums">
              <span className="font-semibold">{Math.round(day.maxTemp)}°</span>
              <span className="text-muted"> / {Math.round(day.minTemp)}°</span>
            </p>
          </div>
        ))}
      </div>

      {/* 데스크톱: 카드 그리드 */}
      <div className="hidden gap-3 lg:grid lg:grid-cols-2 xl:grid-cols-3">
        {days.map((day) => (
          <div
            key={day.date}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <p className="mb-2 text-sm font-medium text-muted">
              {formatShortDate(day.date)}
            </p>
            <p className="mb-3 text-base">{getWeatherLabel(day.weatherCode)}</p>
            <div className="flex items-baseline gap-2 tabular-nums">
              <span className="text-2xl font-bold">{Math.round(day.maxTemp)}°</span>
              <span className="text-muted">/ {Math.round(day.minTemp)}°</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
