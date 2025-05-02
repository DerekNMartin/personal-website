<script lang="ts">
  import type { TmdbMovie } from '$lib/types/tmdb';
  import type { ClassValue } from 'svelte/elements';
  import Widget, { type WidgetProps } from './Widget.svelte';

  interface MoviesWidgetProps
    extends Pick<WidgetProps, 'backgroundTransition' | 'contentTransition'> {
    movies: TmdbMovie[];
    class?: ClassValue;
  }

  const { movies, ...props }: MoviesWidgetProps = $props();

  function movieImgUrl(path: string | null, title?: string) {
    if (!path) return;
    return `https://image.tmdb.org/t/p/w200${path}`;
  }
</script>

<Widget
  class={props.class}
  headingText="Favourite Movies"
  link="https://boxd.it/LLcS"
  linkText="Letterboxd"
  backgroundTransition={props.backgroundTransition}
  contentTransition={props.contentTransition}
>
  <div class="grid grid-cols-3 gap-2 md:grid-cols-5">
    {#each movies as movie}
      <article
        class="ease-out-expo aspect-[1/1.5] overflow-hidden rounded-md transition-transform hover:scale-125 hover:-rotate-2"
      >
        <img
          class="h-full w-full rounded-md bg-neutral-800"
          alt={movie.title}
          src={movieImgUrl(movie.poster_path, movie.title)}
        />
      </article>
    {/each}
  </div>
</Widget>
