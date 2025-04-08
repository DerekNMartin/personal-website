<script lang="ts">
  import ClockWidget from '$lib/components/ClockWidget.svelte';
  import BooksWidget from '$lib/components/BooksWidget.svelte';
</script>

<div class="masonry-container">
  <ClockWidget class="masonry-item" />
  <BooksWidget class="masonry-item" />
</div>

<style>
  @reference 'main-styles';
  .masonry-container {
    @apply columns-5 gap-5;
    column-width: 300px;
  }

  :global(.masonry-item) {
    @apply bg-secondary mb-5 min-h-28 w-full break-inside-avoid-column rounded-3xl rounded-tl-none rounded-br-none p-6 text-white;
  }
</style>
