import BookmarkButton from "@/components/BookmarkButton";
import { getWeatherLabel } from "@/lib/weatherCode";
import { getWeatherTheme } from "@/lib/weatherTheme";
interface WeatherCardProps {
  cityId: string;
  cityName: string;
  temperature: number;
  weatherCode: number;
  humidity: number;
}

export default function WeatherCard({
  cityId,
  cityName,
  temperature,
  weatherCode,
  humidity,
}: WeatherCardProps) {

  const weatherLabel = getWeatherLabel(weatherCode);
  const theme = getWeatherTheme(weatherCode);
  
  return (
    <article 
    className="weather-card w-full rounded-2xl border border-border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:p-5 lg:p-6 "
    style={{background: theme.background}}
    >
     <div className="mb-3 flex items-start justify-between gap-4 text-[#fefefe]">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-xl font-bold md:text-2xl">
            {cityName}
          </h3>

          <BookmarkButton
            cityId={cityId}
            cityName={cityName}
          />
        </div>

        <p className="mt-1 text-sm text-muted md:text-base text-white/80">
          {weatherLabel}
        </p>
      </div>

      <p className="shrink-0 text-3xl font-bold leading-none tabular-nums md:text-4xl">
        {Math.round(temperature)}°
      </p>
     </div>
      <div className="flex items-center justify-between border-t border-border pt-3 text-sm md:text-base">
        <span className="text-muted text-white/80">습도 {humidity}%</span>
        <span className="font-medium text-accent md:hidden text-white opacity-80">상세 보기 →</span>
      </div>
    </article>
  );
}
