import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Skeleton, Badge, Avatar } from "@/01-ui";
import { LazyImage } from "@/02-shared/components/lazy-image";
import { backdropUrl, profileUrl } from "@/02-shared/constants";
import { formatRating, truncateText } from "@/02-shared/utils";
import { fetchMovieDetails } from "../movies.service";
import { fetchTVDetails } from "@/03-features/tv/tv.service";

export function HoverCard({ mediaType, mediaId, anchorRect, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchFn =
      mediaType === "movie" ? fetchMovieDetails : fetchTVDetails;
    fetchFn(mediaId)
      .then(setDetails)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [mediaType, mediaId]);

  if (!anchorRect) return null;

  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  if (isTouchDevice) return null;

  const left = Math.min(anchorRect.right + 8, window.innerWidth - 340);
  const top = Math.min(anchorRect.top, window.innerHeight - 400);

  return createPortal(
    <div
      ref={cardRef}
      className="fixed z-50 w-80 bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
      style={{ left, top }}
      onMouseLeave={onClose}
    >
      {loading ? (
        <div className="p-4 space-y-3">
          <Skeleton className="h-32 w-full" />
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-1/2" />
          <Skeleton variant="text" className="w-full h-16" />
        </div>
      ) : details ? (
        <>
          {details.backdrop_path && (
            <LazyImage
              src={backdropUrl(details.backdrop_path, "w780")}
              alt=""
              className="w-full h-32 object-cover"
            />
          )}
          <div className="p-4 space-y-2">
            <h3 className="text-text font-semibold">
              {details.title || details.name}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              {details.vote_average > 0 && (
                <span className="text-yellow-400 text-sm">
                  ★ {formatRating(details.vote_average)}
                </span>
              )}
              {(details.runtime || details.number_of_seasons) && (
                <span className="text-text-muted text-xs">
                  {details.runtime
                    ? `${details.runtime}min`
                    : `${details.number_of_seasons} season${details.number_of_seasons !== 1 ? "s" : ""}`}
                </span>
              )}
              {details.genres?.slice(0, 3).map((g) => (
                <Badge key={g.id}>{g.name}</Badge>
              ))}
            </div>
            <p className="text-text-muted text-xs leading-relaxed">
              {truncateText(details.overview, 200)}
            </p>
            {details.credits?.cast?.length > 0 && (
              <div className="flex items-center gap-2 pt-2">
                {details.credits.cast.slice(0, 5).map((actor) => (
                  <Avatar
                    key={actor.id}
                    src={profileUrl(actor.profile_path, "w92")}
                    alt={actor.name}
                    size="sm"
                  />
                ))}
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>,
    document.body
  );
}
