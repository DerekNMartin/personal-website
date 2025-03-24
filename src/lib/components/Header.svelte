<script lang="ts">
  import Logo from './Logo.svelte';
  import { useMenu } from '$lib/shared/menu.svelte';

  let markerElement: Element | undefined = $state();
  let menuElement: Element | undefined = $state();

  const menu = useMenu();

  $effect(() => {
    if (menuElement) {
      const menuBox = menuElement.getBoundingClientRect();
      const menuChildren = menuElement.getElementsByTagName('li');
      const selectedItem = menuChildren[menu.selectedIndex.value].getBoundingClientRect();
      if (markerElement) {
        const amount =
          selectedItem.x - menuBox.x + (selectedItem.width / 2 - markerElement.clientWidth / 2);
        markerElement.style.transform = `translateX(${amount}px)`;
      }
    }
  });
</script>

<header class="flex items-center justify-between">
  <Logo></Logo>
  <menu bind:this={menuElement} class="border-primary relative flex gap-4 border-t pt-2">
    <span
      bind:this={markerElement}
      class="bg-primary ease-in-out-back absolute top-0 h-2 w-2 transition-transform"
    ></span>
    {#each menu.menuItems as { label }}
      <li>{label}</li>
    {/each}
  </menu>
</header>
