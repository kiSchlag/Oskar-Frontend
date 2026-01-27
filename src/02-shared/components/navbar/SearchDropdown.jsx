import { posterUrl, profileUrl } from "@/02-shared/constants";
import { LazyImage } from "@/02-shared/components/lazy-image";
import { Badge } from "@/01-ui";
import { formatDate, formatRating } from "@/02-shared/utils";

export function SearchDropdown({ results, onSelect }) {
  if (!results || results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-2xl max-h-96 overflow-y-auto z-50">
      {results.map((item) => {
        const isMedia = item.media_type === "movie" || item.media_type === "tv";
        const title = item.title || item.name;
        const date = item.release_date || item.first_air_date;
        const imgSrc = isMedia
          ? posterUrl(item.poster_path, "w92")
          : profileUrl(item.profile_path, "w92");

        return (
          <button
            key={`${item.media_type}-${item.id}`}
            onClick={() => onSelect(item)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-border/50 transition-colors text-left"
          >
            <LazyImage
              src={imgSrc}
              alt={title}
              className="w-10 h-14 rounded object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-text text-sm font-medium truncate">{title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                {date && (
                  <span className="text-text-muted text-xs">
                    {formatDate(date)}
                  </span>
                )}
                {isMedia && item.vote_average > 0 && (
                  <span className="text-yellow-400 text-xs">
                    ★ {formatRating(item.vote_average)}
                  </span>
                )}
              </div>
            </div>
            <Badge>
              {item.media_type === "movie"
                ? "Movie"
                : item.media_type === "tv"
                  ? "TV"
                  : "Person"}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}
