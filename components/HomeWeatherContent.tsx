import Link from "next/link";
import BookmarkedCitiesSection from "@/components/BookmarkedCitiesSection";
import WeatherCard from "@/components/WeatherCard";
import { CITIES } from "@/data/cities";
import { fetchCurrentWeather } from "@/lib/weather";

export default async function HomeWeatherContent() {
  const cityWeathers = await Promise.all(
    CITIES.map(async (city) => {
      const data = await fetchCurrentWeather(city.lat, city.lon);
      return { city, weather: data.current };
    }),
  );

  return (
    <>
      <BookmarkedCitiesSection cityWeathers={cityWeathers} />

      <section>
        <div className="mb-4 flex items-center justify-between lg:mb-6">
          <h2 className="text-lg font-semibold md:text-xl">전체 도시</h2>
        </div>

        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3">
          {cityWeathers.map(({ city, weather }) => (
            <Link key={city.id} href={`/city/${city.id}`} className="block">
              <WeatherCard
              cityId={city.id}
                cityName={city.name}
                temperature={weather.temperature_2m}
                weatherCode={weather.weather_code}
                humidity={weather.relative_humidity_2m}
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
