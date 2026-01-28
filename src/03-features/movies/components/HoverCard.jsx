import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { profileUrl } from "@/02-shared/constants";
import { formatRating } from "@/02-shared/utils";
import { useMediaCredits } from "@/02-shared/hooks";
import { fetchMovieDetails } from "../movies.service";
import { fetchTVDetails } from "@/03-features/tv/tv.service";

const detailsCache = new Map();

export function HoverCard({
  item,
  mediaType,
  isVisible,
  floatingRef,
  floatingStyles,
  onMouseEnter,
  onMouseLeave,
}) {
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const { cast, loading: castLoading } = useMediaCredits(
    mediaType,
    item?.id,
    isVisible
  );

  const title = item?.title || item?.name;
  const date = item?.release_date || item?.first_air_date;
  const year = date ? date.slice(0, 4) : null;

  useEffect(() => {
    if (!isVisible || !item?.id) return;

    const key = `${mediaType}-${item.id}`;
    if (detailsCache.has(key)) {
      setDetails(detailsCache.get(key));
      return;
    }

    setDetailsLoading(true);
    const fetchFn =
      mediaType === "movie" ? fetchMovieDetails : fetchTVDetails;

    fetchFn(item.id)
      .then((data) => {
        detailsCache.set(key, data);
        setDetails(data);
      })
      .catch(() => {})
      .finally(() => setDetailsLoading(false));
  }, [isVisible, item?.id, mediaType]);

  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  if (isTouchDevice) return null;

  const genres = details?.genres?.slice(0, 4) || [];
  const overview = details?.overview || item?.overview;
  const rating = item?.vote_average || details?.vote_average;

  return createPortal(
    <div
      ref={floatingRef}
      style={{
        ...floatingStyles,
        width: 420,
        zIndex: 1000,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(10px)",
          transition: isVisible
            ? "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1)"
            : "opacity 100ms cubic-bezier(0.4, 0, 0.2, 1), transform 100ms cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform, opacity",
        }}
      >
      <div
        className="p-6 flex flex-col gap-4"
        style={{
          background: "rgba(17, 17, 27, 0.98)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          borderRadius: 16,
        }}
      >
        {/* Header: Title + Rating */}
        <div className="flex items-start justify-between gap-3">
          <h3
            className="font-bold leading-tight"
            style={{ fontSize: 24, color: "#ffffff" }}
          >
            {title}
          </h3>
          {rating > 0 && (
            <span
              className="flex items-center gap-1 shrink-0"
              style={{ fontSize: 16, fontWeight: 600, color: "#ffffff" }}
            >
              <span style={{ color: "#FFD700" }}>★</span>
              {formatRating(rating)}
            </span>
          )}
        </div>

        {/* Metadata: Year + Runtime/Seasons */}
        <div
          className="flex items-center gap-3"
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          {year && <span>{year}</span>}
          {detailsLoading ? (
            <span className="h-4 w-20 rounded bg-white/10 animate-pulse" />
          ) : details ? (
            mediaType === "movie" ? (
              <span>
                {details.runtime ? `${details.runtime} min` : "Runtime unknown"}
              </span>
            ) : (
              <span>
                {details.number_of_seasons
                  ? `${details.number_of_seasons} Season${details.number_of_seasons !== 1 ? "s" : ""}`
                  : "Season information unavailable"}
              </span>
            )
          ) : null}
        </div>

        {/* Genre Badges */}
        {genres.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <span
                key={g.id}
                className="inline-flex items-center rounded-lg"
                style={{
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 500,
                  background: "rgba(139, 92, 246, 0.2)",
                  border: "1px solid rgba(139, 92, 246, 0.4)",
                  color: "rgba(139, 92, 246, 1)",
                  borderRadius: 8,
                }}
              >
                {g.name}
              </span>
            ))}
          </div>
        )}

        {/* Overview */}
        {overview ? (
          <p
            style={{
              fontSize: 15,
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {overview}
          </p>
        ) : (
          <p
            style={{
              fontSize: 15,
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            No overview available
          </p>
        )}

        {/* Cast */}
        {castLoading ? (
          <div className="flex gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className="rounded-full bg-white/10 animate-pulse"
                  style={{ width: 56, height: 56 }}
                />
                <div className="h-3 w-10 rounded bg-white/10 animate-pulse" />
              </div>
            ))}
          </div>
        ) : cast && cast.length > 0 ? (
          <div className="flex gap-3">
            {cast.map((actor) => (
              <div
                key={actor.id}
                className="flex flex-col items-center text-center"
                style={{ width: 64 }}
              >
                <div
                  className="rounded-full overflow-hidden shrink-0"
                  style={{
                    width: 56,
                    height: 56,
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    background: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {actor.profile_path ? (
                    <img
                      src={profileUrl(actor.profile_path, "w185")}
                      alt={actor.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      {actor.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                  )}
                </div>
                <span
                  className="truncate w-full mt-1"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#ffffff",
                  }}
                >
                  {actor.name}
                </span>
                <span
                  className="truncate w-full"
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  {actor.character}
                </span>
              </div>
            ))}
          </div>
        ) : cast !== null ? (
          <p style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.5)" }}>
            Cast information unavailable
          </p>
        ) : null}
      </div>
      </div>
    </div>,
    document.body
  );
}
