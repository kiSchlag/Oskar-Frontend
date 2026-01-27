import { apiFetch } from "@/02-shared/utils";

export function fetchTrending(timeWindow = "week", page = 1) {
  return apiFetch(`/tmdb/trending/${timeWindow}?page=${page}`);
}
