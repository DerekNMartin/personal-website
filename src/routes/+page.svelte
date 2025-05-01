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
  <ClockWidget />
  <BooksWidget books={data.books} />
  <MoviesWidget movies={data.movies} />
  <StravaWidget strava={data.strava} />
  <WeatherWidget weather={data.weather} />
  <MusicWidget music={data.music} />
</div>

<style>
  @reference 'main-styles';
  /* TODO: https://codesandbox.io/p/sandbox/vibrant-darkness-ppp92p?file=%2Findex.html%3A149%2C65 */
  .masonry-container {
    @apply columns-3 gap-5;
    column-width: 300px;
  }
</style>
