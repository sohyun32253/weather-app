import Skeleton from "@/components/skeletons/Skeleton";

export default function CityDetailSkeleton() {
  return (
    <main className="min-h-screen" aria-busy="true" aria-label="도시 날씨 불러오는 중">
      <div className="mx-auto w-full max-w-md px-4 py-6 md:max-w-3xl lg:max-w-6xl lg:px-8 lg:py-10">
        <Skeleton className="mb-6 h-5 w-24" />

        <div className="lg:grid lg:grid-cols-5 lg:items-start lg:gap-10 xl:gap-14">
          <section className="mb-8 lg:col-span-2 lg:mb-0">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-8">
              <div className="flex items-start justify-between gap-4">
                <Skeleton className="h-9 w-28 md:h-10 md:w-32 lg:h-12 lg:w-36" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
              <Skeleton className="mt-2 h-4 w-40 md:h-5 md:w-48" />

              <div className="mt-6 space-y-4 md:mt-8">
                <Skeleton className="h-7 w-32 md:h-8 md:w-40 lg:h-9 lg:w-44" />
                <Skeleton className="h-12 w-24 md:h-14 md:w-28 lg:h-16 lg:w-32" />
              </div>

              <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-5 md:gap-6 lg:mt-8 lg:gap-8">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-5 w-12" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-5 w-12" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-5 w-12" />
                </div>
              </div>
            </div>
          </section>

          <section className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6 lg:p-8">
              <WeeklyForecastSkeleton />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function WeeklyForecastSkeleton() {
  return (
    <section>
      <Skeleton className="mb-3 h-5 w-20 md:h-6 md:w-24" />

      <div className="flex flex-col gap-2 lg:hidden">
        {Array.from({ length: 7 }, (_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-3"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Skeleton className="h-4 w-16 shrink-0" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-14 shrink-0" />
          </div>
        ))}
      </div>

      <div className="hidden gap-3 lg:grid lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 7 }, (_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <Skeleton className="mb-2 h-4 w-16" />
            <Skeleton className="mb-3 h-5 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
    </section>
  );
}
