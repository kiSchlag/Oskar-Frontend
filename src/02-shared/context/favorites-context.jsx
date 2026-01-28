import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useToast } from "./toast-context";
import {
  fetchFavorites,
  addFavorite,
  removeFavoriteByMedia,
} from "@/03-features/journal/journal.service";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const load = useCallback(() => {
    setLoading(true);
    fetchFavorites()
      .then(setFavorites)
      .catch(() => setFavorites([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const isFavorite = useCallback(
    (mediaType, mediaId) =>
      favorites.some(
        (f) => f.media_type === mediaType && f.media_id === mediaId
      ),
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (item, mediaType) => {
      const mediaId = item.id;
      const title = item.title || item.name;

      if (isFavorite(mediaType, mediaId)) {
        await removeFavoriteByMedia(mediaType, mediaId);
        setFavorites((prev) =>
          prev.filter(
            (f) => !(f.media_type === mediaType && f.media_id === mediaId)
          )
        );
        addToast(`Removed "${title}" from journal`, "info");
      } else {
        const fav = await addFavorite({
          media_type: mediaType,
          media_id: mediaId,
          title,
          poster_path: item.poster_path || null,
        });
        setFavorites((prev) => [...prev, fav]);
        addToast(`Added "${title}" to journal`, "success");
      }
    },
    [isFavorite, addToast]
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, loading, isFavorite, toggleFavorite, refetch: load }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
}
