<script lang="ts">
  import Widget from './Widget.svelte';
  import type { FableBooksResponse } from '$lib/types/fable';
  import type { ClassValue } from 'svelte/elements';

  interface BooksWidgetProps {
    books: FableBooksResponse;
    class?: ClassValue;
  }

  const { books, ...props }: BooksWidgetProps = $props();
</script>

<Widget
  class={props.class}
  headingText="Recently Read"
  link="https://fable.co/derek-martin-138781558181"
  linkText="Fable"
>
  <div class="carousel relative flex max-w-full overflow-hidden">
    {#each { length: 2 }}
      <div class="group flex gap-2 pr-2">
        {#each books.results as { book }}
          <a href={book.url} target="_blank" title={book.title}>
            <article
              class="z-20 aspect-[1/1.5] min-h-32 transition-transform hover:scale-110 hover:-rotate-2"
            >
              <img
                class="h-full w-full rounded-md rounded-tl-none rounded-bl-none"
                alt={book.title}
                src={book.cover_image_resize + '?w=100'}
              />
            </article>
          </a>
        {/each}
      </div>
    {/each}
  </div>
</Widget>

<style>
  @reference 'main-styles';

  .carousel {
    &:hover .group {
      animation-play-state: paused;
    }
  }

  .group {
    animation: scrolling 18s linear infinite;
  }

  @keyframes scrolling {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
</style>
