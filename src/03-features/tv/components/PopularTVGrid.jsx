import { usePopularTV } from "../use-popular-tv";
import { MediaCard, MediaCardSkeleton } from "@/03-features/movies";

export function PopularTVGrid({ isFavorite, onToggleFavorite }) {
  const { data, loading } = usePopularTV();

  return (
    <section className="py-8 bg-darker/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-text mb-4">Popular TV Series</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <MediaCardSkeleton key={i} />
              ))
            : data?.results?.slice(0, 12).map((show) => (
                <MediaCard
                  key={show.id}
                  item={show}
                  mediaType="tv"
                  isFavorited={isFavorite?.("tv", show.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
