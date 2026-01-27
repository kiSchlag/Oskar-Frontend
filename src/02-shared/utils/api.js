import { API_BASE_URL } from "@/02-shared/constants";

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const error = new Error(`API error: ${res.status}`);
    error.status = res.status;
    try {
      error.data = await res.json();
    } catch {}
    throw error;
  }
  return res.json();
}

export function apiFetch(endpoint) {
  return request(endpoint);
}

export function apiPost(endpoint, body) {
  return request(endpoint, { method: "POST", body: JSON.stringify(body) });
}

export function apiPut(endpoint, body) {
  return request(endpoint, { method: "PUT", body: JSON.stringify(body) });
}

export function apiDelete(endpoint) {
  return request(endpoint, { method: "DELETE" });
}
