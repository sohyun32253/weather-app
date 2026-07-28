import WeatherGridSkeleton from "@/components/skeletons/WeatherGridSkeleton";

export default function HomeWeatherSkeleton() {
  return (
    <>
      <section className="mb-10" aria-busy="true" aria-label="북마크 도시 불러오는 중">
        <div className="mb-4 flex items-center justify-between lg:mb-6">
          <h2 className="text-lg font-semibold md:text-xl">북마크한 도시</h2>
        </div>
        <WeatherGridSkeleton count={2} showBookmark />
      </section>

      <section aria-busy="true" aria-label="전체 도시 날씨 불러오는 중">
        <div className="mb-4 flex items-center justify-between lg:mb-6">
          <h2 className="text-lg font-semibold md:text-xl">전체 도시</h2>
        </div>
        <WeatherGridSkeleton count={5} />
      </section>
    </>
  );
}
