import Link from "next/link";
import { notFound } from "next/navigation";
import BookmarkButton from "@/components/BookmarkButton";
import WeeklyForecast from "@/components/WeeklyForecast";
import { getCityById } from "@/data/cities";
import {
  fetchWeatherDetail,
  formatDateTime,
  parseDailyForecast,
} from "@/lib/weather";
import { getWeatherLabel } from "@/lib/weatherCode";

interface CityDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CityDetailPage({ params }: CityDetailPageProps) {
  const { id } = await params;
  const city = getCityById(id);

  if (!city) {
    notFound();
  }

  const data = await fetchWeatherDetail(city.lat, city.lon);
  const { current, daily } = data;
  const weeklyForecast = daily ? parseDailyForecast(daily) : [];
  const todayForecast = weeklyForecast[0];

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-md px-4 py-6 md:max-w-3xl lg:max-w-6xl lg:px-8 lg:py-10">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm text-accent hover:underline md:text-base"
        >
          ← 목록으로
        </Link>

        {/* 모바일: 세로 스택 / 데스크톱: 현재 날씨 + 주간 예보 2단 */}
        <div className="lg:grid lg:grid-cols-5 lg:items-start lg:gap-10 xl:gap-14">
          <section className="mb-8 lg:col-span-2 lg:mb-0 lg:sticky lg:top-8">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-8">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                  {city.name}
                </h1>
                <BookmarkButton cityId={city.id} cityName={city.name} />
              </div>
              <p className="mt-2 text-sm text-muted md:text-base">
                {formatDateTime(current.time)} 기준
              </p>

              <div className="mt-6 md:mt-8">
                <p className="text-2xl leading-none md:text-2xl lg:text-3xl">
                  {getWeatherLabel(current.weather_code)}
                </p>
                <p className="mt-4 text-4xl font-bold tabular-nums md:text-5xl lg:text-6xl">
                  {Math.round(current.temperature_2m)}°
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-5 text-sm md:gap-6 md:text-base lg:mt-8 lg:gap-8">
                {todayForecast && (
                  <>
                    <div>
                      <p className="text-muted">최고</p>
                      <p className="font-semibold tabular-nums">
                        {Math.round(todayForecast.maxTemp)}°C
                      </p>
                    </div>
                    <div>
                      <p className="text-muted">최저</p>
                      <p className="font-semibold tabular-nums">
                        {Math.round(todayForecast.minTemp)}°C
                      </p>
                    </div>
                  </>
                )}
                <div>
                  <p className="text-muted">습도</p>
                  <p className="font-semibold tabular-nums">
                    {current.relative_humidity_2m}%
                  </p>
                </div>
              </div>
            </div>
          </section>

          {weeklyForecast.length > 0 && (
            <section className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6 lg:p-8">
                <WeeklyForecast days={weeklyForecast} />
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
