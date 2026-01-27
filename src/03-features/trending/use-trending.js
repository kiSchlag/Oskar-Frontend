import { useFetch } from "@/02-shared/hooks";

export function useTrending(timeWindow = "week") {
  return useFetch(`/tmdb/trending/${timeWindow}`);
}
