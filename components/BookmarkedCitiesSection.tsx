"use client";

import Link from "next/link";
import BookmarkButton from "@/components/BookmarkButton";
import WeatherCard from "@/components/WeatherCard";
import WeatherGridSkeleton from "@/components/skeletons/WeatherGridSkeleton";
import { useBookmarks } from "@/hooks/useBookmarks";
import type { City } from "@/data/cities";
import type { CurrentWeather } from "@/types/weather";

interface BookmarkedCitiesSectionProps {
  cityWeathers: { city: City; weather: CurrentWeather }[];
}

export default function BookmarkedCitiesSection({
  cityWeathers,
}: BookmarkedCitiesSectionProps) {
  const { bookmarks, isLoaded } = useBookmarks();

  const bookmarkedCities = cityWeathers.filter(({ city }) =>
    bookmarks.includes(city.id),
  );

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between lg:mb-6">
        <h2 className="text-lg font-semibold md:text-xl">북마크한 도시</h2>
        {isLoaded && bookmarkedCities.length > 0 && (
          <span className="text-sm text-muted">{bookmarkedCities.length}개</span>
        )}
      </div>

      {!isLoaded ? (
        <WeatherGridSkeleton count={2} showBookmark />
      ) : bookmarkedCities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-center">
          <p className="text-sm text-muted md:text-base">
            북마크한 도시가 없습니다.
          </p>
          <p className="mt-1 text-xs text-muted md:text-sm">
            도시 상세 페이지에서 북마크를 추가하거나 검색 결과에서 북마크해
            보세요.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3">
          {bookmarkedCities.map(({ city, weather }) => (
            <Link key={city.id} href={`/city/${city.id}`} className="block">
              <WeatherCard
                cityName={city.name}
                temperature={weather.temperature_2m}
                weatherCode={weather.weather_code}
                humidity={weather.relative_humidity_2m}
                headerAction={
                  <BookmarkButton cityId={city.id} cityName={city.name} />
                }
              />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
