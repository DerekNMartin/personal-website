<script lang="ts">
  import type { TmdbResponse } from '$lib/types/tmdb';

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

  const props = $props();

  async function fetchMovies() {
    try {
      const params = new URLSearchParams();
      MOVIES.forEach((title) => params.append('query', title));
      const response = await fetch(`/api/tmdb?${params.toString()}`);
      const result: TmdbResponse = await response.json();
      if (!response.ok) throw new Error(result.status_message || 'Something went wrong');
      return result;
    } catch (error) {
      throw error;
    }
  }

  const fetchMoviesPromise = fetchMovies();

  function movieImgUrl(path: string | null) {
    if (!path) return;
    return `https://image.tmdb.org/t/p/w200${path}`;
  }
</script>

<article class={['flex flex-col gap-4', props.class]}>
  Favourite Movies
  <div class="grid grid-cols-3 gap-2 md:grid-cols-5">
    {#await fetchMoviesPromise}
      {#each { length: 15 }}
        <article class="aspect-[1/1.5] min-h-32 animate-pulse rounded-md bg-neutral-300"></article>
      {/each}
    {:then movies}
      {#each movies.movies as movie}
        <article class="aspect-[1/1.5] transition-transform hover:scale-125 hover:-rotate-2">
          <img
            class="h-full w-full rounded-md"
            alt={movie.title}
            src={movieImgUrl(movie.poster_path)}
          />
        </article>
      {/each}
    {:catch error}
      <p class="text-primary">{error.message}</p>
    {/await}
  </div>
  <a class="link" href="https://boxd.it/LLcS" target="_blank">Letterboxd</a>
</article>
