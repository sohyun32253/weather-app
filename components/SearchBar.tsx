"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import BookmarkButton from "@/components/BookmarkButton";
import { searchCities, type City } from "@/data/cities";
import { useBookmarks } from "@/hooks/useBookmarks";

interface SearchBarProps {
  cities: City[];
  className?: string;
}

export default function SearchBar({ cities, className = "" }: SearchBarProps) {
  const router = useRouter();
  const { bookmarks, isLoaded } = useBookmarks();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const trimmedQuery = query.trim();
  const matchingCities =
    trimmedQuery.length > 0 ? searchCities(trimmedQuery, cities) : [];
  const bookmarkedMatches = matchingCities.filter((city) =>
    bookmarks.includes(city.id),
  );
  const otherMatches = matchingCities.filter(
    (city) => !bookmarks.includes(city.id),
  );
  const hasResults = bookmarkedMatches.length > 0 || otherMatches.length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (cityId: string) => {
    setQuery("");
    setIsOpen(false);
    router.push(`/city/${cityId}`);
  };

  return (
    <div
      ref={containerRef}
      className={`search-bar relative w-full ${className}`}
    >
      <input
        type="text"
        value={query}
        placeholder="관심 도시 검색"
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full rounded-xl border border-border bg-card p-3 pr-10 text-sm shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 md:p-3.5 md:text-base"
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 border-none bg-transparent"
        aria-label="검색"
        onClick={() => setIsOpen(true)}
      >
        <img src="/images/search_bar.svg" alt="" />
      </button>

      {isOpen && trimmedQuery.length > 0 && isLoaded && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 max-h-80 overflow-y-auto rounded-xl border border-border bg-card shadow-lg">
          {!hasResults ? (
            <p className="px-4 py-3 text-sm text-muted">
              &quot;{trimmedQuery}&quot;에 해당하는 도시가 없습니다.
            </p>
          ) : (
            <>
              {bookmarkedMatches.length > 0 && (
                <SearchResultGroup
                  title="북마크한 도시"
                  cities={bookmarkedMatches}
                  onSelect={handleSelect}
                />
              )}
              {otherMatches.length > 0 && (
                <SearchResultGroup
                  title="다른 도시"
                  cities={otherMatches}
                  onSelect={handleSelect}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

interface SearchResultGroupProps {
  title: string;
  cities: City[];
  onSelect: (cityId: string) => void;
}

function SearchResultGroup({
  title,
  cities,
  onSelect,
}: SearchResultGroupProps) {
  return (
    <div className="border-b border-border last:border-b-0">
      <p className="sticky top-0 bg-card px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted">
        {title}
      </p>
      <ul>
        {cities.map((city) => (
          <li key={city.id}>
            <div className="flex items-center justify-between gap-2 px-2 hover:bg-accent/5">
              <button
                type="button"
                onClick={() => onSelect(city.id)}
                className="flex-1 px-2 py-3 text-left text-sm md:text-base"
              >
                {city.name}
              </button>
              <BookmarkButton cityId={city.id} cityName={city.name} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
