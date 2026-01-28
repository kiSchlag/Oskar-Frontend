export function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).getFullYear().toString();
}

export function formatRating(vote) {
  if (!vote) return "N/A";
  return vote.toFixed(1);
}

export function truncateText(text, maxLen = 150) {
  if (!text || text.length <= maxLen) return text || "";
  return text.slice(0, maxLen).trimEnd() + "...";
}

export function formatRuntime(minutes) {
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h`;
  return `${mins}m`;
}

export function formatSeasons(count) {
  if (!count) return null;
  return `${count} Season${count !== 1 ? "s" : ""}`;
}
