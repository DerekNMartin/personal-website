import { TMDB_ACCESS_TOKEN } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import type { TmdbMovie } from '$lib/types/tmdb';

const tmdbUrl = new URL('https://api.themoviedb.org/3/search/movie');

export const GET: RequestHandler = async ({ url }) => {
  const queries = url.searchParams.getAll('query');

  if (!queries.length) {
    return new Response(JSON.stringify({ message: 'Missing query param(s)' }), {
      status: 400
    });
  }

  const movies = await Promise.all(
    queries.map(async (query) => {
      const url = new URL(tmdbUrl);
      url.searchParams.set('query', query);

      const res = await fetch(url.href, {
        headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` }
      });

      const data = await res.json();
      return { ...((data.results[0] as TmdbMovie) ?? []), error: data.status_message as string };
    })
  );

  return new Response(JSON.stringify(movies), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'cache-control': 'private, max-age=3600' }
  });
};
