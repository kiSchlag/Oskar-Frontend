import clsx from "clsx";
import { posterUrl, profileUrl } from "@/02-shared/constants";
import { LazyImage } from "@/02-shared/components/lazy-image";
import { Badge } from "@/01-ui";
import { formatDate, formatRating } from "@/02-shared/utils";
import { useHoverIntent } from "@/02-shared/hooks";
import { HoverCard } from "@/03-features/movies/components/HoverCard";

function SearchResultItem({ item, onSelect, isFavorited }) {
  const isMedia = item.media_type === "movie" || item.media_type === "tv";
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const imgSrc = isMedia
    ? posterUrl(item.poster_path, "w92")
    : profileUrl(item.profile_path, "w92");

  const {
    isHovered,
    referenceRef,
    floatingRef,
    floatingStyles,
    handleMouseEnter,
    handleMouseLeave,
  } = useHoverIntent();

  return (
    <>
      <button
        ref={isMedia ? referenceRef : undefined}
        key={`${item.media_type}-${item.id}`}
        onClick={() => onSelect(item)}
        className={clsx(
          "w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left",
          isFavorited && "drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] bg-purple-500/10"
        )}
        onMouseEnter={isMedia ? handleMouseEnter : undefined}
        onMouseLeave={isMedia ? handleMouseLeave : undefined}
      >
        <LazyImage
          src={imgSrc}
          alt={title}
          className={clsx(
            "w-10 h-14 rounded object-cover shrink-0",
            isFavorited && "ring-2 ring-purple-500"
          )}
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
      {isMedia && (
        <HoverCard
          item={item}
          mediaType={item.media_type}
          isVisible={isHovered}
          floatingRef={floatingRef}
          floatingStyles={floatingStyles}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </>
  );
}

export function SearchDropdown({ results, onSelect, isFavorite }) {
  if (!results || results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-dark/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl max-h-96 overflow-y-auto z-50">
      {results.map((item) => {
        const isMedia = item.media_type === "movie" || item.media_type === "tv";
        const isFavorited = isMedia && isFavorite?.(item.media_type, item.id);

        return (
          <SearchResultItem
            key={`${item.media_type}-${item.id}`}
            item={item}
            onSelect={onSelect}
            isFavorited={isFavorited}
          />
        );
      })}
    </div>
  );
}
