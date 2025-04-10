<script lang="ts">
  const { books, ...props } = $props();
</script>

<article class={['flex flex-col gap-4', props.class]}>
  Recently Read
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
  <a class="link" href="https://fable.co/derek-martin-138781558181" target="_blank">Fable</a>
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
