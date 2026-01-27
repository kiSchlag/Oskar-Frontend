import { useEffect, useCallback } from "react";
import { Spinner } from "@/01-ui";
import { useToast } from "@/02-shared/context";
import { useFavorites, EmptyState, FavoriteCard } from "@/03-features/journal";
import { removeFavorite } from "@/03-features/journal";

export default function JournalPage() {
  const { favorites, loading, refetch } = useFavorites();
  const { addToast } = useToast();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 500);
    }
  }, [favorites]);

  const handleRemove = useCallback(
    async (id) => {
      await removeFavorite(id);
      addToast("Removed from journal", "info");
      refetch();
    },
    [addToast, refetch]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">Journal</h1>
        <p className="text-text-muted mt-1">
          Your personal collection of saved movies and TV shows.
        </p>
      </div>

      {favorites.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map((fav) => (
            <FavoriteCard key={fav.id} favorite={fav} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
}
