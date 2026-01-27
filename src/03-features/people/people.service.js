import { apiFetch } from "@/02-shared/utils";

export function fetchPopularPeople(page = 1) {
  return apiFetch(`/tmdb/people/popular?page=${page}`);
}
