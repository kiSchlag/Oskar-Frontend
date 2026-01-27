import { usePopularMovies } from "../use-popular-movies";
import { MediaCard } from "./MediaCard";
import { MediaCardSkeleton } from "./MediaCardSkeleton";

export function PopularMoviesGrid({ isFavorite, onToggleFavorite }) {
  const { data, loading } = usePopularMovies();

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-text mb-4">Popular Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <MediaCardSkeleton key={i} />
              ))
            : data?.results?.slice(0, 12).map((movie) => (
                <MediaCard
                  key={movie.id}
                  item={movie}
                  mediaType="movie"
                  isFavorited={isFavorite?.("movie", movie.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
