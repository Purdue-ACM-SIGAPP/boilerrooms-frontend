import axios from "axios";
import { API_BASE_URL } from "@env";

const client = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 15000,
});

function messageFor(error) {
  const { response } = error;
  if (!response) return "Can't reach the server. Check your connection and try again.";
  if (response.status === 404) return "We couldn't find what you were looking for.";
  const { data } = response;
  if (typeof data === "string" && data) return data;
  return data?.message || data?.Message || data?.title || "Something went wrong. Please try again.";
}

// Unwrap data on success; reject with a readable Error (with .status) on failure.
client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const normalized = new Error(messageFor(error));
    normalized.status = error.response?.status;
    return Promise.reject(normalized);
  }
);

export function uploadFile(path, file) {
  const form = new FormData();
  form.append("file", file);
  return client.post(path, form, { headers: { "Content-Type": "multipart/form-data" } });
}

export default client;
