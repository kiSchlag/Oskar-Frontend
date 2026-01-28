import { useCallback } from "react";
import { Card, Badge, Skeleton } from "@/01-ui";
import { LazyImage } from "@/02-shared/components/lazy-image";
import { posterUrl } from "@/02-shared/constants";
import {
  formatDate,
  formatRating,
  formatRuntime,
  formatSeasons,
} from "@/02-shared/utils";
import { useMediaDetails, useMediaCredits } from "@/02-shared/hooks";
import { useNotes } from "../use-notes";
import { NoteEditor } from "./NoteEditor";
import { CastStrip } from "./CastStrip";

export function JournalSlate({ favorite, onRemove }) {
  const { details, loading: detailsLoading } = useMediaDetails(
    favorite.media_type,
    favorite.media_id
  );
  const { cast, loading: castLoading } = useMediaCredits(
    favorite.media_type,
    favorite.media_id,
    true
  );
  const { notes, saveNote } = useNotes(favorite.media_type, favorite.media_id);
  const note = notes[0] || null;

  const handleRemove = useCallback(
    (e) => {
      e.stopPropagation();
      onRemove(favorite.id);
    },
    [favorite.id, onRemove]
  );

  const year = details
    ? formatDate(details.release_date || details.first_air_date)
    : null;
  const duration =
    favorite.media_type === "movie"
      ? formatRuntime(details?.runtime)
      : formatSeasons(details?.number_of_seasons);
  const rating = details?.vote_average
    ? formatRating(details.vote_average)
    : null;

  return (
    <Card className="flex flex-col md:flex-row" id={`fav-${favorite.id}`}>
      {/* Poster */}
      <div className="w-full md:w-[150px] shrink-0">
        <div className="aspect-[2/3] relative overflow-hidden">
          <LazyImage
            src={posterUrl(favorite.poster_path)}
            alt={favorite.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row flex-1 p-4 gap-4">
        {/* Metadata + Cast + Description Section */}
        <div className="flex flex-col gap-2 md:w-[460px] shrink-0">
          {/* Top: Title/metadata left, Cast right */}
          <div className="flex items-start gap-4">
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <h3 className="text-text font-semibold text-lg line-clamp-2">
                {favorite.title}
              </h3>

              {/* Year, Duration, Rating */}
              <div className="flex items-center gap-2 text-sm text-text-muted flex-wrap">
                {detailsLoading ? (
                  <Skeleton variant="text" className="w-32 h-4" />
                ) : (
                  <>
                    {year && <span>{year}</span>}
                    {year && duration && <span>-</span>}
                    {duration && <span>{duration}</span>}
                    {rating && (
                      <span className="text-yellow-400">
                        <span className="mr-0.5">&#9733;</span>
                        {rating}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Genre Badges */}
              <div className="flex flex-wrap gap-1.5">
                {detailsLoading ? (
                  <>
                    <Skeleton variant="rectangular" className="w-16 h-5 rounded-full" />
                    <Skeleton variant="rectangular" className="w-14 h-5 rounded-full" />
                  </>
                ) : (
                  <>
                    {details?.genres?.slice(0, 3).map((genre) => (
                      <Badge key={genre.id}>{genre.name}</Badge>
                    ))}
                    <Badge className="bg-border text-text-muted">
                      {favorite.media_type === "movie" ? "Movie" : "TV Show"}
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Cast */}
            <div className="shrink-0">
              <CastStrip cast={cast} loading={castLoading} maxVisible={4} />
            </div>
          </div>

          {/* Description */}
          {detailsLoading ? (
            <Skeleton variant="text" className="w-full h-10" />
          ) : (
            details?.overview && (
              <p className="text-text-muted text-sm line-clamp-2">
                {details.overview}
              </p>
            )
          )}
        </div>

        {/* Notes Section */}
        <div className="flex-1 min-w-0">
          <NoteEditor note={note} onSave={saveNote} />
        </div>

        {/* Remove Button */}
        <div className="flex items-start shrink-0">
          <button
            onClick={handleRemove}
            className="p-2 text-text-muted/50 hover:text-text-muted transition-colors rounded-lg hover:bg-border/50"
            aria-label="Remove from journal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
}
