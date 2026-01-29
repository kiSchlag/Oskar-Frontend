import { Card } from "@/01-ui";
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

  const imgSrc = posterUrl(poster_path, "w342");
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
      className="cursor-pointer w-40"
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <LazyImage
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Rating badge - top right */}
        {vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-white text-sm font-medium">{rating}</span>
          </div>
        )}

        {/* Metadata overlay - bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h4 className="text-white font-semibold text-sm leading-tight truncate">
            {title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-white/80 mt-1">
            {year && <span>{year}</span>}
            {duration && (
              <>
                <span className="text-white/50">·</span>
                <span>{duration}</span>
              </>
            )}
          </div>
          {displayGenres.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {displayGenres.map((genre) => (
                <span
                  key={genre}
                  className="text-[10px] px-1.5 py-0.5 bg-white/20 rounded text-white/90"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
