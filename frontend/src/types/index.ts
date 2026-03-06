export type User = {
  id: number;
  email: string;
  created_at: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type BookSearchResult = {
  google_books_id: string;
  title: string | null;
  authors: string[];
  description: string | null;
  published_date: string | null;
  publisher: string | null;
  page_count: number | null;
  categories: string[];
  average_rating: number | null;
  ratings_count: number | null;
  thumbnail: string | null;
  small_thumbnail: string | null;
  preview_link: string | null;
  info_link: string | null;
  isbn_10: string | null;
  isbn_13: string | null;
  saleability: string | null;
};

export type BookSearchResponse = {
  query: string;
  count: number;
  results: BookSearchResult[];
};
