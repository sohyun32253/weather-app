import { formatShortDate } from "@/lib/weather";
import { getWeatherLabel } from "@/lib/weatherCode";
import type { DailyForecastItem } from "@/types/weather";
import type { WeatherTheme } from "@/lib/weatherTheme";

interface WeeklyForecastProps {
  days: DailyForecastItem[];
  theme: WeatherTheme;
}

export default function WeeklyForecast({ days, theme }: WeeklyForecastProps) {

  return (
    <section
    className="rounded-3xl bg-white/10  backdrop-blur-sm"
    style={{ background: theme.background }}
  >
    <h3 className="mb-4 text-lg font-semibold text-white">
      주간 예보
    </h3>
  
    {/* 모바일 */}
    <div className="flex flex-col gap-3 lg:hidden">
      {days.map((day) => (
        <div
          key={day.date}
          className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">
                {formatShortDate(day.date)}
              </p>
  
              <p className="mt-1 text-base font-medium text-white">
                {getWeatherLabel(day.weatherCode)}
              </p>
            </div>
  
            <div className="text-right tabular-nums">
              <p className="text-lg font-bold text-white">
                {Math.round(day.maxTemp)}°
              </p>
  
              <p className="text-sm text-white/70">
                {Math.round(day.minTemp)}°
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  
    {/* 데스크톱 */}
    <div className="hidden gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-3">
      {days.map((day) => (
        <div
          key={day.date}
          className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm"
        >
          <p className="text-sm font-medium text-white/80">
            {formatShortDate(day.date)}
          </p>
  
          <p className="mt-3 text-lg font-semibold text-white">
            {getWeatherLabel(day.weatherCode)}
          </p>
  
          <div className="mt-5 flex items-end gap-2 tabular-nums">
            <span className="text-3xl font-bold text-white">
              {Math.round(day.maxTemp)}°
            </span>
  
            <span className="pb-1 text-base text-white/70">
              / {Math.round(day.minTemp)}°
            </span>
          </div>
        </div>
      ))}
    </div>
  </section>
  );
}
