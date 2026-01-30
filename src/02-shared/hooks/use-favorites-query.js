import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useToast } from "@/02-shared/context/toast-context";
import {
  fetchFavorites,
  addFavorite,
  removeFavoriteByMedia,
} from "@/03-features/journal/journal.service";
import { queryKeys } from "@/02-shared/lib";

export function useFavoritesQuery() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const {
    data: favorites = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: queryKeys.favorites.list(),
    queryFn: () => fetchFavorites(),
  });

  const sortedFavorites = useMemo(
    () =>
      [...favorites].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      ),
    [favorites]
  );

  const addMutation = useMutation({
    mutationFn: addFavorite,
    onMutate: async (newFavorite) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.favorites.list() });

      const previousFavorites = queryClient.getQueryData(
        queryKeys.favorites.list()
      );

      queryClient.setQueryData(queryKeys.favorites.list(), (old = []) => [
        ...old,
        { ...newFavorite, id: `temp-${Date.now()}` },
      ]);

      return { previousFavorites, title: newFavorite.title };
    },
    onSuccess: (data, variables, context) => {
      addToast(`Added "${context.title}" to journal`, "success");
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        queryKeys.favorites.list(),
        context.previousFavorites
      );
      addToast("Failed to add to journal", "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.list() });
    },
  });

  const removeMutation = useMutation({
    mutationFn: ({ mediaType, mediaId }) =>
      removeFavoriteByMedia(mediaType, mediaId),
    onMutate: async ({ mediaType, mediaId, title }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.favorites.list() });

      const previousFavorites = queryClient.getQueryData(
        queryKeys.favorites.list()
      );

      queryClient.setQueryData(queryKeys.favorites.list(), (old = []) =>
        old.filter(
          (f) => !(f.media_type === mediaType && f.media_id === mediaId)
        )
      );

      return { previousFavorites, title };
    },
    onSuccess: (data, variables, context) => {
      addToast(`Removed "${context.title}" from journal`, "info");
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        queryKeys.favorites.list(),
        context.previousFavorites
      );
      addToast("Failed to remove from journal", "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.list() });
    },
  });

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
        removeMutation.mutate({ mediaType, mediaId, title });
      } else {
        addMutation.mutate({
          media_type: mediaType,
          media_id: mediaId,
          title,
          poster_path: item.poster_path || null,
        });
      }
    },
    [isFavorite, addMutation, removeMutation]
  );

  const invalidateFavorites = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.favorites.list() });
  }, [queryClient]);

  return {
    favorites: sortedFavorites,
    loading,
    isFavorite,
    toggleFavorite,
    refetch,
    invalidateFavorites,
  };
}
