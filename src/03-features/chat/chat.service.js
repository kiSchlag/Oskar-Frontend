import { apiFetch, apiPost, apiDelete } from "@/02-shared/utils";

export function sendMessage(message, sessionId = null, userId = "default") {
  return apiPost("/chat/", { message, session_id: sessionId, user_id: userId });
}

export function getSession(sessionId) {
  return apiFetch(`/chat/session/${sessionId}`);
}

export function deleteSession(sessionId) {
  return apiDelete(`/chat/session/${sessionId}`);
}
