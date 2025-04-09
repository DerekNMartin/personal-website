<script lang="ts">
  import type { FableBooksResponse } from '$lib/types/fable';
  const props = $props();

  async function fetchBooks() {
    try {
      const response = await fetch(
        'https://api.fable.co/api/v2/users/3c147b4b-b66e-485e-a8f1-c4065cc8a68e/book_lists/3f9bb88e-2e40-495e-bcc9-fee089184313/books?limit=10'
      );
      const result: FableBooksResponse = await response.json();
      if (!response.ok) throw new Error(result?.detail || 'Something went wrong');
      return result;
    } catch (error) {
      throw error;
    }
  }

  const fetchBooksPromise = fetchBooks();
</script>

<article class={['flex flex-col gap-4', props.class]}>
  Recently Read
  {#await fetchBooksPromise}
    <div class="flex gap-2 overflow-hidden">
      {#each { length: 4 }}
        <article
          class="aspect-[1/1.5] min-h-32 animate-pulse rounded-md rounded-tl-none rounded-bl-none bg-neutral-300"
        ></article>
      {/each}
    </div>
  {:then books}
    <div class="carousel flex max-w-full overflow-hidden">
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
  {:catch error}
    <p class="text-primary">{error.message}</p>
  {/await}
</article>

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
