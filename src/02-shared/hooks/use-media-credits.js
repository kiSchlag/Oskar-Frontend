import { useState, useEffect } from "react";
import { fetchMovieCredits } from "@/03-features/movies/movies.service";
import { fetchTVCredits } from "@/03-features/tv/tv.service";

const cache = new Map();

export function useMediaCredits(mediaType, mediaId, enabled) {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled || !mediaId) return;

    const key = `${mediaType}-${mediaId}`;
    if (cache.has(key)) {
      setCast(cache.get(key));
      return;
    }

    setLoading(true);
    const fetchFn = mediaType === "movie" ? fetchMovieCredits : fetchTVCredits;

    fetchFn(mediaId)
      .then((data) => {
        const topCast = (data.cast || []).slice(0, 5);
        cache.set(key, topCast);
        setCast(topCast);
      })
      .catch(() => setCast(null))
      .finally(() => setLoading(false));
  }, [mediaType, mediaId, enabled]);

  return { cast, loading };
}
