import WeatherCardSkeleton from "@/components/skeletons/WeatherCardSkeleton";

interface WeatherGridSkeletonProps {
  count?: number;
  showBookmark?: boolean;
}

export default function WeatherGridSkeleton({
  count = 5,
  showBookmark = false,
}: WeatherGridSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="날씨 정보 불러오는 중"
      className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3"
    >
      {Array.from({ length: count }, (_, index) => (
        <WeatherCardSkeleton key={index} showBookmark={showBookmark} />
      ))}
    </div>
  );
}
