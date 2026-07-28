"use client";

import { useBookmarks } from "@/hooks/useBookmarks";

interface BookmarkButtonProps {
  cityId: string;
  cityName: string;
  className?: string;
}

export default function BookmarkButton({
  cityId,
  cityName,
  className = "",
}: BookmarkButtonProps) {
  const { isLoaded, isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(cityId);

  if (!isLoaded) {
    return (
      <button
        type="button"
        disabled
        aria-label={`${cityName} 북마크`}
        className={`-mr-1 rounded-lg p-1.5 text-muted opacity-50 ${className}`}
      >
        <BookmarkIcon filled={false} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleBookmark(cityId);
      }}
      aria-label={bookmarked ? `${cityName} 북마크 해제` : `${cityName} 북마크`}
      aria-pressed={bookmarked}
      className={`-mr-1 rounded-lg p-1.5 transition hover:bg-accent/10 ${bookmarked ? "text-accent" : "text-muted hover:text-accent"} ${className}`}
    >
      <BookmarkIcon filled={bookmarked} />
    </button>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
      />
    </svg>
  );
}
