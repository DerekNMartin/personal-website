import type { PageServerLoad } from './$types';
import type { TmdbResponse } from '$lib/types/tmdb';
import type { FableBooksResponse } from '$lib/types/fable';

const MOVIES = [
  'Isle of Dogs',
  'Her',
  'The Lord of the Rings: The Return of the King',
  'The Hateful Eight',
  'Memento',
  'The Dark Knight',
  'Good Will Hunting',
  'Ex Machina',
  'Rear Window',
  'Mad Max: Fury Road',
  'Arrival',
  'The Prestige',
  'Drive',
  'Shutter Island',
  'Parasite - 2019'
];

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  async function fetchStrava() {
    const response = await fetch('/api/strava');
    const result = await response.json();
    if (!response.ok) throw new Error('Unable to fetch Strava data');
    return result;
  }

  async function fetchBooks() {
    const response = await fetch('/api/fable');
    const result: FableBooksResponse = await response.json();
    if (!response.ok) throw new Error('Unable to fetch books');
    return result;
  }

  async function fetchMovies() {
    const params = new URLSearchParams();
    MOVIES.forEach((title) => params.append('query', title));
    const response = await fetch(`/api/tmdb?${params.toString()}`);
    const result: TmdbResponse = await response.json();
    if (!response.ok) throw new Error('Unable to fetch Letterboxd data');
    return result;
  }

  const strava = await fetchStrava();
  const books = await fetchBooks();
  const movies = await fetchMovies();

  setHeaders({ 'cache-control': 'private, max-age=3600' });
  return { strava, books, movies };
};
