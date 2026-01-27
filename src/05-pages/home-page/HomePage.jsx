import { HeroSection, TrendingCarousel } from "@/03-features/trending";
import { PopularMoviesGrid } from "@/03-features/movies";
import { PopularTVGrid } from "@/03-features/tv";
import { PopularPeopleCarousel } from "@/03-features/people";
import { useFavorites } from "@/03-features/journal";

export default function HomePage() {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="min-h-screen">
      <HeroSection onSaveToJournal={toggleFavorite} isFavorite={isFavorite} />
      <TrendingCarousel
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
      <PopularMoviesGrid
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
      <PopularTVGrid
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
      <PopularPeopleCarousel />
    </div>
  );
}
