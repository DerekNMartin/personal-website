<script lang="ts">
  import { fade } from 'svelte/transition';
  import Logo from './Logo.svelte';
  import { useMenu } from '$lib/shared/menu.svelte';

  const menu = useMenu();
</script>

<svelte:head>
  <title>{menu.currentPageItem?.title} | Derek Martin</title>
</svelte:head>
<header class="flex items-center justify-between">
  <Logo></Logo>
  {#key menu.currentPageItem?.title}
    <h1 in:fade={{ duration: 200 }} class="page-title text-primary font-heading text-3xl">
      {menu.currentPageItem?.title}
    </h1>
  {/key}
</header>

<style>
  .page-title {
    filter: blur(0.8px);
    animation:
      jitter 30ms infinite,
      2000ms linear normal forwards 1 running glitch;
  }
  @keyframes jitter {
    0% {
      opacity: 0.8;
      transform: translateY(0.8px);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.8;
      transform: translateY(0);
    }
  }
  @keyframes glitch {
    10% {
    }
    20% {
      transform: scale(1, 1);
      transform: skew(0, 0);
    }
    21% {
      transform: scale(1, 1.1);
      transform: skew(40deg, 0);
    }
    22% {
      transform: scale(1, 1.1);
      transform: skew(-25deg, 0);
    }
    23% {
      transform: scale(1, 1);
      transform: skew(0, 0);
    }
    45% {
    }
  }
</style>
