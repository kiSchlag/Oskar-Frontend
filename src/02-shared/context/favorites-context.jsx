import { createContext, useContext } from "react";
import { useFavoritesQuery } from "@/02-shared/hooks/use-favorites-query";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const favoritesData = useFavoritesQuery();

  return (
    <FavoritesContext.Provider value={favoritesData}>
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
