export interface FableBooksResponse {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface FableBooksError {
  id: string;
  detail: string;
}

export interface Result {
  book: Book2;
  source: string;
  favorite: boolean;
  sort_value: number;
}

export interface Book2 {
  id: string;
  title: string;
  subtitle: string;
  cover_image: string;
  cover_image_small: string;
  published_date: string;
  embargoed_until: string;
  imprint: string;
  isbn: string;
  source: string;
  description: string;
  authors: Author[];
  price_usd: string;
  page_count: number;
  chapter_count: number;
  subjects: string[][];
  can_purchase: boolean;
  can_download: boolean;
  store_availability: string;
  fable_summary: string;
  background_color: string;
  is_free: boolean;
  fable_prompts_document: null | string;
  epub_updated_at: string;
  cover_image_updated_at: string;
  url: string;
  cover_image_resize: string;
  audio_playlist: null;
  audiobook: null;
  has_preview: boolean;
  preview_end_cfi: string;
  type: string;
  is_out_of_catalog: boolean;
  marketplaces: string[];
  tropes: null;
  iap_identifier: string;
  non_fiction: boolean;
  genres: Genre[];
  storygraph_tags: Storygraphtags;
  ai_summary: null;
  review_summary: Reviewsummary | null;
  editorial_notes: string;
  bookseries_set: Bookseriesset[];
  series: Series[];
  is_series_placeholder: boolean;
  trailers: any[] | null;
  user_rating: null;
  review_link: null;
  has_review: boolean;
  started_reading_at: string;
  started_reading_date_type: string;
  finished_reading_at: string;
  finished_reading_date_type: string;
  series_title?: string;
  content_rating?: null;
  series_genres?: any[];
}

export interface Series {
  id: string;
  authors: string[];
  entries: Entry[];
  title: string;
  content_rating: null;
  description: string;
  genres: any[];
  trailers: null;
  item_count: number;
  networks: null;
  first_published_date: null;
}

export interface Entry {
  book: Book;
  sort_value: number;
}

export interface Book {
  id: string;
  title: string;
  cover_image_small: string;
}

export interface Bookseriesset {
  book_series: Bookseries;
}

export interface Bookseries {
  id: string;
  authors: string[];
  title: string;
  content_rating: null;
  description: string;
  genres: any[];
  trailers: null;
  item_count: number;
  networks: null;
  first_published_date: null;
}

export interface Reviewsummary {
  liked: string;
  disliked: string;
  disagreed: string;
}

export interface Storygraphtags {
  moods: string[];
  genres: string[];
  content_warnings: string[];
}

export interface Genre {
  id: string;
  name: string;
  type: string;
}

export interface Author {
  name: string;
  biography: string;
  slug: string;
}
