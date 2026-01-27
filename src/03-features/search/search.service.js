import { apiFetch } from "@/02-shared/utils";

export function searchMulti(query, page = 1) {
  return apiFetch(`/tmdb/search?query=${encodeURIComponent(query)}&page=${page}`);
}
