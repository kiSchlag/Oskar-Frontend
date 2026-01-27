import { useFetch } from "@/02-shared/hooks";

export function usePopularMovies(page = 1) {
  return useFetch(`/tmdb/movies/popular?page=${page}`);
}
