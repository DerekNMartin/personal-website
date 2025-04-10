<script lang="ts">
  const { movies, ...props } = $props();

  function movieImgUrl(path: string | null) {
    if (!path) return;
    return `https://image.tmdb.org/t/p/w200${path}`;
  }
</script>

<article class={['flex flex-col gap-4', props.class]}>
  Favourite Movies
  <div class="grid grid-cols-3 gap-2 md:grid-cols-5">
    {#each movies as movie}
      <article class="aspect-[1/1.5] transition-transform hover:scale-125 hover:-rotate-2">
        <img
          class="h-full w-full rounded-md"
          alt={movie.title}
          src={movieImgUrl(movie.poster_path)}
        />
      </article>
    {/each}
  </div>
  <a class="link" href="https://boxd.it/LLcS" target="_blank">Letterboxd</a>
</article>
