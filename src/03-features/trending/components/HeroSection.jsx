import { Button, Badge, Skeleton } from "@/01-ui";
import { LazyImage } from "@/02-shared/components/lazy-image";
import { backdropUrl } from "@/02-shared/constants";
import { formatRating, truncateText, formatDate } from "@/02-shared/utils";
import { useTrending } from "../use-trending";

export function HeroSection({ onSaveToJournal, isFavorite }) {
  const { data, loading } = useTrending("week");
  const hero = data?.results?.[0];

  if (loading) {
    return (
      <div className="relative w-full h-[calc(70vh+4rem)] -mt-16 bg-darker">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (!hero) return null;

  const title = hero.title || hero.name;
  const date = hero.release_date || hero.first_air_date;
  const mediaType = hero.media_type || "movie";

  return (
    <section className="relative w-full h-[calc(70vh+4rem)] -mt-16 overflow-hidden">
      <LazyImage
        src={backdropUrl(hero.backdrop_path)}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          {hero.vote_average > 0 && (
            <span className="text-yellow-400 text-lg font-semibold">
              ★ {formatRating(hero.vote_average)}
            </span>
          )}
          {date && <span className="text-text-muted">{formatDate(date)}</span>}
          <Badge>{mediaType === "movie" ? "Movie" : "TV"}</Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-text-muted text-lg max-w-2xl mb-6">
          {truncateText(hero.overview, 250)}
        </p>
        <div className="flex gap-3">
          <Button
            variant="primary"
            onClick={() => onSaveToJournal?.(hero, mediaType)}
          >
            {isFavorite?.(mediaType, hero.id)
              ? "Saved to Journal"
              : "Save to Journal"}
          </Button>
        </div>
      </div>
    </section>
  );
}
