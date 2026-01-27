import { useFetch } from "@/02-shared/hooks";

export function usePopularTV(page = 1) {
  return useFetch(`/tmdb/tv/popular?page=${page}`);
}
