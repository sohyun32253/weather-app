import { Suspense } from "react";
import HomeWeatherContent from "@/components/HomeWeatherContent";
import SearchBar from "@/components/SearchBar";
import HomeWeatherSkeleton from "@/components/skeletons/HomeWeatherSkeleton";
import { CITIES } from "@/data/cities";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#eef5fe]">
      <div className="mx-auto w-full max-w-md px-4 py-6 md:max-w-3xl lg:max-w-6xl lg:px-8 lg:py-10">
        <header className="mb-6 lg:mb-10 lg:flex lg:items-end lg:justify-between lg:gap-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
              Weather App
            </h1>
            <p className="mt-1 text-sm text-muted md:text-base">
              한국 주요 도시의 현재 날씨를 확인하세요.
            </p>
          </div>
          <SearchBar cities={CITIES} className="lg:max-w-sm lg:shrink-0" />
        </header>

        <Suspense fallback={<HomeWeatherSkeleton />}>
          <HomeWeatherContent />
        </Suspense>
      </div>
    </main>
  );
}
