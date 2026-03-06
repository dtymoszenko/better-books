import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchBooks, type BookSearchResult } from "../api/books";
import { getToken, removeToken } from "../api/auth";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BookSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isLoggedIn = !!getToken();
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    navigate("/login");
  }

  async function handleSearch(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);

    try {
      const data = await searchBooks(trimmed);
      setResults(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>BetterBooks</h1>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={{ padding: "0.4rem 0.9rem", cursor: "pointer" }}>
            Log out
          </button>
        ) : (
          <Link to="/login" style={{ padding: "0.4rem 0.9rem", textDecoration: "none", border: "1px solid #ccc", borderRadius: 6 }}>
            Sign in
          </Link>
        )}
      </div>
      <p>Search books through Google Books API</p>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book (e.g. The Hobbit)"
          style={{ flex: 1, padding: "0.6rem" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {results.map((book) => (
          <li
            key={book.google_books_id}
            style={{
              display: "flex",
              gap: "1rem",
              padding: "0.75rem 0",
              borderBottom: "1px solid #ddd"
            }}
          >
            <div style={{ width: 80, flexShrink: 0 }}>
              {book.thumbnail ? (
                <img
                  src={book.thumbnail}
                  alt={book.title ?? "Book cover"}
                  style={{ width: 80, height: "auto" }}
                />
              ) : (
                <div style={{ width: 80, height: 120, background: "#eee" }} />
              )}
            </div>

            <div>
              <h3 style={{ margin: 0 }}>{book.title ?? "Untitled"}</h3>

              <p style={{ margin: "0.25rem 0" }}>
                {book.authors.length ? book.authors.join(", ") : "Unknown author"}
              </p>

              <p style={{ margin: "0.25rem 0", color: "#666" }}>
                {book.published_date ?? "Unknown year"}
              </p>

              {book.description && (
                <p style={{ marginTop: "0.5rem" }}>
                  {book.description.slice(0, 220)}
                  {book.description.length > 220 ? "..." : ""}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
