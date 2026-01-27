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
