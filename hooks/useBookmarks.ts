"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BOOKMARKS_CHANGED_EVENT,
  getBookmarks,
  toggleBookmark as toggleBookmarkStorage,
} from "@/lib/bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarksState] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setBookmarksState(getBookmarks());
    setIsLoaded(true);

    const syncBookmarks = () => setBookmarksState(getBookmarks());

    window.addEventListener(BOOKMARKS_CHANGED_EVENT, syncBookmarks);
    window.addEventListener("storage", syncBookmarks);

    return () => {
      window.removeEventListener(BOOKMARKS_CHANGED_EVENT, syncBookmarks);
      window.removeEventListener("storage", syncBookmarks);
    };
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    const next = toggleBookmarkStorage(id);
    setBookmarksState(next);
    return next;
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.includes(id),
    [bookmarks],
  );

  return { bookmarks, isLoaded, toggleBookmark, isBookmarked };
}
