export const BOOKMARKS_STORAGE_KEY = "weather-app-bookmarks";
export const BOOKMARKS_CHANGED_EVENT = "bookmarks-changed";

export function getBookmarks(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

export function setBookmarks(ids: string[]): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    BOOKMARKS_STORAGE_KEY,
    JSON.stringify(ids)
  );

  window.dispatchEvent(
    new Event(BOOKMARKS_CHANGED_EVENT)
  );
}

export function toggleBookmark(id: string): string[] {
  const bookmarks = getBookmarks();
  const next = bookmarks.includes(id)
    ? bookmarks.filter((bookmarkId) => bookmarkId !== id)
    : [...bookmarks, id];

  setBookmarks(next);
  return next;
}

export function isBookmarked(id: string): boolean {
  return getBookmarks().includes(id);
}
