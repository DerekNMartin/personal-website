import type { PageServerLoad } from './$types';
import type { TmdbMovie } from '$lib/types/tmdb';
import type { FableBooksResponse } from '$lib/types/fable';
import type { WeatherResponse } from '$lib/types/weather';
import type { SpotifyCurrentlyPlayingResponse } from '$lib/types/spotify';

const MOVIES = [
  'Isle of Dogs',
  'Her',
  'The Lord of the Rings: The Return of the King',
  'The Hateful Eight',
  'Memento',
  'The Dark Knight',
  'Good Will Hunting',
  'Ex Machina - 2015',
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
    return result;
  }

  async function fetchBooks() {
    const response = await fetch('/api/fable');
    const result: FableBooksResponse = await response.json();
    return result;
  }

  async function fetchMovies() {
    const params = new URLSearchParams();
    MOVIES.forEach((title) => params.append('query', title));
    const response = await fetch(`/api/tmdb?${params.toString()}`);
    const result: TmdbMovie[] = await response.json();
    return result;
  }

  async function fetchWeather() {
    const response = await fetch('/api/weather');
    const result: WeatherResponse = await response.json();
    return result;
  }

  async function fetchSpotify() {
    const response = await fetch('/api/spotify');
    const result: SpotifyCurrentlyPlayingResponse = await response.json();
    return result;
  }

  try {
    const [books, movies, strava, weather, music] = await Promise.all([
      fetchBooks(),
      fetchMovies(),
      fetchStrava(),
      fetchWeather(),
      fetchSpotify()
    ]);
    setHeaders({ 'cache-control': 'private, max-age=3600' });
    return { strava, movies, books, weather, music };
  } catch (error) {
    throw new Error(error?.message || 'Page fetch error');
  }
};
