<script lang="ts">
  import type { PageProps } from './$types';
  import ClockWidget from '$lib/components/ClockWidget.svelte';
  import BooksWidget from '$lib/components/BooksWidget.svelte';
  import MoviesWidget from '$lib/components/MoviesWidget.svelte';
  import StravaWidget from '$lib/components/StravaWidget.svelte';
  import WeatherWidget from '$lib/components/WeatherWidget.svelte';
  import MusicWidget from '$lib/components/MusicWidget.svelte';

  const { data }: PageProps = $props();
</script>

<div class="masonry-container">
  <ClockWidget class="masonry-item" />
  <BooksWidget books={data.books} class="masonry-item" />
  <MoviesWidget movies={data.movies} class="masonry-item" />
  <StravaWidget strava={data.strava} class="masonry-item" />
  <WeatherWidget weather={data.weather} class="masonry-item" />
  <MusicWidget music={data.music} class="masonry-item" />
</div>

<style>
  @reference 'main-styles';
  /* TODO: https://codesandbox.io/p/sandbox/vibrant-darkness-ppp92p?file=%2Findex.html%3A149%2C65 */
  .masonry-container {
    @apply columns-3 gap-5;
    column-width: 300px;
  }

  :global(.masonry-item) {
    @apply bg-secondary mb-5 min-h-28 w-full break-inside-avoid-column rounded-3xl rounded-tl-none rounded-br-none p-6 text-white;
  }
</style>
