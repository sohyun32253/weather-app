import Skeleton from "@/components/skeletons/Skeleton";

interface WeatherCardSkeletonProps {
  showBookmark?: boolean;
}

export default function WeatherCardSkeleton({
  showBookmark = false,
}: WeatherCardSkeletonProps) {
  return (
    <article
      aria-hidden="true"
      className="w-full rounded-2xl border border-border bg-card p-4 shadow-sm md:p-5 lg:p-6"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-7 w-20 md:h-8 md:w-24" />
          <Skeleton className="h-4 w-28 md:h-5 md:w-32" />
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          {showBookmark && <Skeleton className="h-5 w-5 rounded-lg" />}
          <Skeleton className="h-9 w-16 md:h-10 md:w-20" />
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-3">
        <Skeleton className="h-4 w-20 md:h-5 md:w-24" />
        <Skeleton className="h-4 w-16 md:hidden" />
      </div>
    </article>
  );
}
