import { useState, useEffect } from "react";
import { fetchMovieDetails } from "@/03-features/movies/movies.service";
import { fetchTVDetails } from "@/03-features/tv/tv.service";

const cache = new Map();

export function useMediaDetails(mediaType, mediaId, enabled = true) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled || !mediaId) return;

    const key = `${mediaType}-${mediaId}`;
    if (cache.has(key)) {
      setDetails(cache.get(key));
      return;
    }

    setLoading(true);
    const fetchFn = mediaType === "movie" ? fetchMovieDetails : fetchTVDetails;

    fetchFn(mediaId)
      .then((data) => {
        const parsed = {
          genres: data.genres || [],
          runtime: data.runtime || null,
          number_of_seasons: data.number_of_seasons || null,
          release_date: data.release_date || null,
          first_air_date: data.first_air_date || null,
          vote_average: data.vote_average || 0,
          overview: data.overview || null,
        };
        cache.set(key, parsed);
        setDetails(parsed);
      })
      .catch(() => setDetails(null))
      .finally(() => setLoading(false));
  }, [mediaType, mediaId, enabled]);

  return { details, loading };
}
