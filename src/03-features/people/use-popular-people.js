import { useFetch } from "@/02-shared/hooks";

export function usePopularPeople(page = 1) {
  return useFetch(`/tmdb/people/popular?page=${page}`);
}
