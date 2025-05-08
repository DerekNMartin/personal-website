<script lang="ts">
  import type { PageProps } from './$types';

  import ClockWidget from '$lib/components/widgets/ClockWidget.svelte';
  import BooksWidget from '$lib/components/widgets/BooksWidget.svelte';
  import MoviesWidget from '$lib/components/widgets/MoviesWidget.svelte';
  import StravaWidget from '$lib/components/widgets/StravaWidget.svelte';
  import WeatherWidget from '$lib/components/widgets/WeatherWidget.svelte';
  import MusicWidget from '$lib/components/widgets/MusicWidget.svelte';

  import { usePower } from '$lib/shared/power.svelte';

  const { data }: PageProps = $props();
  const power = usePower();

  const widgetAnimation = {
    duration: 800,
    delay: 900
  };

  const widgets = [
    {
      name: 'ClockWidget',
      component: ClockWidget
    },
    {
      name: 'BooksWidget',
      component: BooksWidget,
      props: { books: data.books }
    },
    {
      name: 'MoviesWidget',
      component: MoviesWidget,
      props: { movies: data.movies }
    },
    {
      name: 'StravaWidget',
      component: StravaWidget,
      props: { strava: data.strava }
    },
    {
      name: 'WeatherWidget',
      component: WeatherWidget,
      props: { weather: data.weather }
    },
    {
      name: 'MusicWidget',
      component: MusicWidget,
      props: { music: data.music }
    }
  ];
</script>

<div class="masonry-container">
  {#each widgets as widget, index (widget.name)}
    {@const WidgetComponent = widget.component}
    {#if power.isOn}
      <WidgetComponent
        {...widget?.props}
        backgroundTransition={{
          duration: widgetAnimation.duration,
          delay: index * 100 + widgetAnimation.delay
        }}
        contentTransition={{
          delay: index * 100 + (widgetAnimation.duration + 200)
        }}
      />
    {/if}
  {/each}
</div>

<style>
  @reference 'main-styles';
  /* TODO: https://codesandbox.io/p/sandbox/vibrant-darkness-ppp92p?file=%2Findex.html%3A149%2C65 */
  .masonry-container {
    @apply columns-3 gap-5;
    column-width: 300px;
  }
</style>
