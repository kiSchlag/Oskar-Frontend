import { apiFetch } from "@/02-shared/utils";

export function fetchPopularMovies(page = 1) {
  return apiFetch(`/tmdb/movies/popular?page=${page}`);
}

export function fetchMovieDetails(id) {
  return apiFetch(`/tmdb/movie/${id}`);
}

export function fetchMovieGenres() {
  return apiFetch("/tmdb/genres/movie");
}
