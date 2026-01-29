import { Card, Badge } from "@/01-ui";
import { LazyImage } from "@/02-shared/components/lazy-image";
import { posterUrl } from "@/02-shared/constants";
import {
  formatDate,
  formatRating,
  formatRuntime,
  formatSeasons,
} from "@/02-shared/utils";

export function ChatMediaCard({
  recommendation,
  isFavorited,
  onToggleFavorite,
}) {
  const {
    media_type,
    title,
    poster_path,
    vote_average,
    release_date,
    genres,
    runtime,
    number_of_seasons,
  } = recommendation;

  const imgSrc = posterUrl(poster_path, "w154");
  const year = formatDate(release_date);
  const rating = formatRating(vote_average);
  const duration =
    media_type === "movie"
      ? formatRuntime(runtime)
      : formatSeasons(number_of_seasons);
  const displayGenres = (genres || []).slice(0, 3);

  return (
    <Card
      glowing={isFavorited}
      onClick={onToggleFavorite}
      className="mt-3 flex items-stretch gap-3 p-2 hover:bg-border/30 transition-colors"
    >
      <div className="w-16 h-24 shrink-0 rounded overflow-hidden">
        <LazyImage
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
        <h4 className="text-text font-medium text-sm truncate">{title}</h4>

        <div className="flex items-center gap-2 text-xs text-text-muted">
          {year && <span>{year}</span>}
          {vote_average > 0 && (
            <span className="text-yellow-400">★ {rating}</span>
          )}
          {duration && (
            <>
              <span className="text-border">·</span>
              <span>{duration}</span>
            </>
          )}
        </div>

        {displayGenres.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-0.5">
            {displayGenres.map((genre) => (
              <Badge key={genre} className="text-[10px] px-1.5 py-0">
                {genre}
              </Badge>
            ))}
          </div>
        )}

        <p className="text-[10px] text-text-muted mt-1">
          {isFavorited ? "Click to remove from journal" : "Click to add to journal"}
        </p>
      </div>
    </Card>
  );
}
