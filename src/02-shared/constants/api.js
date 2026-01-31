export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export function posterUrl(path, size = "w500") {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function backdropUrl(path, size = "original") {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function profileUrl(path, size = "w185") {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}
