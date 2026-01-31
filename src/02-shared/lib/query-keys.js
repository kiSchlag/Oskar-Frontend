export const queryKeys = {
  favorites: {
    all: ["favorites"],
    list: () => [...queryKeys.favorites.all, "list"],
  },
  notes: {
    all: ["notes"],
    media: (mediaType, mediaId) => [...queryKeys.notes.all, mediaType, mediaId],
  },
};
