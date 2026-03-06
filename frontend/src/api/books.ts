import { apiFetch } from "../lib/api";
import type { BookSearchResponse } from "../types";

export async function searchBooks(query: string): Promise<BookSearchResponse> {
  const res = await apiFetch(`/books/search?q=${encodeURIComponent(query)}`);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Search failed (${res.status}): ${text}`);
  }

  return res.json();
}
