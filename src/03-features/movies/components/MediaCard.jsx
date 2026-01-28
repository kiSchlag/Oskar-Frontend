import { useCallback } from "react";
import { Card } from "@/01-ui";
import { LazyImage } from "@/02-shared/components/lazy-image";
import { posterUrl } from "@/02-shared/constants";
import { formatDate, formatRating } from "@/02-shared/utils";
import { useHoverIntent } from "@/02-shared/hooks";
import { HoverCard } from "./HoverCard";

export function MediaCard({ item, mediaType, isFavorited, onToggleFavorite }) {
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const imgSrc = posterUrl(item.poster_path);

  const {
    isHovered,
    referenceRef,
    floatingRef,
    floatingStyles,
    handleMouseEnter,
    handleMouseLeave,
  } = useHoverIntent();

  const handleClick = useCallback(() => {
    onToggleFavorite?.(item, mediaType);
  }, [item, mediaType, onToggleFavorite]);

  return (
    <>
      <Card
        ref={referenceRef}
        glowing={isFavorited}
        onClick={handleClick}
        className="group relative hover:scale-[1.03] transition-transform duration-200 cursor-pointer"
        data-media-type={mediaType}
        data-media-id={item.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="aspect-[2/3] relative overflow-hidden">
          <LazyImage
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
            <p className="text-white text-sm font-medium truncate">{title}</p>
            <div className="flex items-center gap-2 mt-1">
              {date && (
                <span className="text-text-muted text-xs">
                  {formatDate(date)}
                </span>
              )}
              {item.vote_average > 0 && (
                <span className="text-yellow-400 text-xs">
                  ★ {formatRating(item.vote_average)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
      <HoverCard
        item={item}
        mediaType={mediaType}
        isVisible={isHovered}
        floatingRef={floatingRef}
        floatingStyles={floatingStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </>
  );
}
