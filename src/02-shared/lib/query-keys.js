export const queryKeys = {
  favorites: {
    all: ["favorites"],
    list: () => [...queryKeys.favorites.all, "list"],
  },
};
