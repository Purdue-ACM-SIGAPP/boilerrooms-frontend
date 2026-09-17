export const imageUri = (base64) => (base64 ? `data:image/png;base64,${base64}` : null);

export const buildingLabel = (building) =>
  building?.acronym ? `${building.name} (${building.acronym})` : building?.name ?? "";

export function formatDate(value, { withTime = false } = {}) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return withTime
    ? date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
    : date.toLocaleDateString(undefined, { dateStyle: "medium" });
}

// Ratings are stored 1–10 and displayed as 5 stars.
export const formatRating = (rating) => (rating == null ? "No ratings yet" : `${(rating / 2).toFixed(1)} / 5`);

export function formatDuration(minutes) {
  if (!minutes) return "";
  const whole = Math.floor(minutes);
  const seconds = Math.round((minutes - whole) * 60);
  return `${whole}:${String(seconds).padStart(2, "0")}`;
}

const pad = (n) => String(n).padStart(2, "0");

// "YYYY-MM-DD HH:mm" in local time, for plain-text date inputs.
export function toDateInput(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// Parses "YYYY-MM-DD HH:mm" (time optional); returns an ISO string or null.
export function parseDateInput(text) {
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?$/.exec(text.trim());
  if (!match) return null;
  const [, y, m, d, hh = "0", mm = "0"] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d), Number(hh), Number(mm));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}
