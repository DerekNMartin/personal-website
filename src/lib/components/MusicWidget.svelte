<script lang="ts">
  import type { SpotifyCurrentlyPlayingResponse } from '$lib/types/spotify';
  import type { ClassValue } from 'svelte/elements';

  interface MusicWidgetProps {
    music: SpotifyCurrentlyPlayingResponse | { status: number; error: string };
    class?: ClassValue;
  }

  const { music, ...props }: MusicWidgetProps = $props();
  const isError = 'error' in music;

  const albumImgUrl = $derived((!isError && music.item?.album?.images[0]?.url) || '');
  const albumTitle = $derived((!isError && music.item?.album?.name) || '');
  const songTitle = $derived((!isError && music.item?.name) || '');
  const artistName = $derived((!isError && music.item?.artists[0].name) || '');
  const songUrl = $derived((!isError && music.item?.external_urls?.spotify) || '');

  $inspect(music);
</script>

<article class={['flex flex-col gap-4', props.class]}>
  <div class="flex items-center justify-between">
    <p>Playing Now</p>
    <div class={['loader', isError ? 'invisible' : 'visible']}></div>
  </div>
  {#if isError}
    <section class="flex items-center gap-4">
      <div class="aspect-square w-32 animate-pulse rounded-full bg-neutral-300"></div>
      <p class="text-sm">Nothing playing at the moment. :(</p>
    </section>
  {:else}
    <section class="flex flex-col items-center gap-4 sm:flex-row">
      <a href={songUrl} target="_blank">
        <img
          class="record-spin hover:outline-primary aspect-square w-32 rounded-full outline-2 outline-transparent transition-colors"
          src={albumImgUrl}
          alt={albumTitle}
          title={albumTitle}
        />
      </a>
      <div class="flex flex-col gap-1">
        <p class="text-lg">{songTitle}</p>
        <p>{artistName}</p>
      </div>
    </section>
  {/if}
</article>

<style>
  .record-spin {
    animation: spin 3.5s linear infinite;
  }

  .loader {
    width: 24px;
    aspect-ratio: 0.75;
    --c: no-repeat linear-gradient(#fff 0 0);
    background:
      var(--c) 0% 50%,
      var(--c) 50% 50%,
      var(--c) 100% 50%;
    animation: l7 1.5s infinite linear alternate;
  }
  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes l7 {
    0% {
      background-size:
        20% 50%,
        20% 50%,
        20% 50%;
    }
    20% {
      background-size:
        20% 20%,
        20% 50%,
        20% 50%;
    }
    40% {
      background-size:
        20% 100%,
        20% 20%,
        20% 50%;
    }
    60% {
      background-size:
        20% 50%,
        20% 100%,
        20% 20%;
    }
    80% {
      background-size:
        20% 50%,
        20% 50%,
        20% 100%;
    }
    100% {
      background-size:
        20% 50%,
        20% 50%,
        20% 50%;
    }
  }
</style>
