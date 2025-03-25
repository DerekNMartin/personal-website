<script lang="ts">
  import Logo from './Logo.svelte';
  import { useMenu } from '$lib/shared/menu.svelte';

  let markerElement: HTMLElement | undefined;
  let menuElement: HTMLElement | undefined;

  const menu = useMenu();

  $effect(() => {
    if (menuElement && markerElement) {
      const menuBox = menuElement.getBoundingClientRect();
      const menuChildren = menuElement.getElementsByTagName('li');
      const selectedItem = menuChildren[menu.pageIndex].getBoundingClientRect();
      const markerWidth = markerElement.getBoundingClientRect().width;
      const amount = selectedItem.x - menuBox.x + (selectedItem.width / 2 - markerWidth / 2);
      markerElement.style.transform = `translateX(${amount}px)`;
    }
  });
</script>

<svelte:head>
  <title>{menu.currentPageItem.title} | Derek Martin</title>
</svelte:head>
<header class="flex items-center justify-between">
  <Logo></Logo>
  <menu bind:this={menuElement} class="border-primary relative flex gap-4 border-t pt-2">
    <span
      bind:this={markerElement}
      class="ease-in-out-back border-t-primary marker absolute top-0 h-0 w-0 border-t-8 border-r-8 border-l-8 border-r-transparent border-l-transparent transition-transform"
    ></span>
    {#each menu.menuItems as { title }}
      <li>{title}</li>
    {/each}
  </menu>
</header>

<style>
  .marker {
    filter: blur(0.6px);
    animation: blur 50ms infinite;
  }
  @keyframes blur {
    0% {
      opacity: 0.8;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.8;
    }
  }
</style>
