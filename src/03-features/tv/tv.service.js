import { apiFetch } from "@/02-shared/utils";

export function fetchPopularTV(page = 1) {
  return apiFetch(`/tmdb/tv/popular?page=${page}`);
}

export function fetchTVDetails(id) {
  return apiFetch(`/tmdb/tv/${id}`);
}

export function fetchTVGenres() {
  return apiFetch("/tmdb/genres/tv");
}
