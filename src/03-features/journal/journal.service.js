import { apiFetch, apiPost, apiPut, apiDelete } from "@/02-shared/utils";

const USER_ID = "default";

export function fetchFavorites(userId = USER_ID) {
  return apiFetch(`/journal/favorites?user_id=${userId}`);
}

export function addFavorite(body) {
  return apiPost(`/journal/favorites?user_id=${USER_ID}`, body);
}

export function removeFavorite(id) {
  return apiDelete(`/journal/favorites/${id}`);
}

export function removeFavoriteByMedia(mediaType, mediaId) {
  return apiDelete(
    `/journal/favorites?media_type=${mediaType}&media_id=${mediaId}&user_id=${USER_ID}`
  );
}

export function checkFavorite(mediaType, mediaId) {
  return apiFetch(
    `/journal/favorites/check?media_type=${mediaType}&media_id=${mediaId}&user_id=${USER_ID}`
  );
}

export function fetchNotes(userId = USER_ID) {
  return apiFetch(`/journal/notes?user_id=${userId}`);
}

export function fetchMediaNotes(mediaType, mediaId) {
  return apiFetch(
    `/journal/notes/media?media_type=${mediaType}&media_id=${mediaId}&user_id=${USER_ID}`
  );
}

export function createNote(body) {
  return apiPost(`/journal/notes?user_id=${USER_ID}`, body);
}

export function updateNote(id, body) {
  return apiPut(`/journal/notes/${id}`, body);
}

export function deleteNote(id) {
  return apiDelete(`/journal/notes/${id}`);
}
