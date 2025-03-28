<script lang="ts">
  import { useMenu } from '$lib/shared/menu.svelte';

  let markerElement: HTMLElement | undefined = $state();
  let menuElement: HTMLElement | undefined = $state();

  const menu = useMenu();

  const markerTransform = $derived.by(() => {
    if (menuElement && markerElement) {
      const menuBox = menuElement.getBoundingClientRect();
      const menuChildren = menuElement.getElementsByTagName('li');
      const selectedItem = menuChildren[menu.pageIndex].getBoundingClientRect();
      const markerWidth = markerElement.getBoundingClientRect().width;
      const amount = selectedItem.x - menuBox.x + (selectedItem.width / 2 - markerWidth / 2);
      return `translateX(${amount}px)`;
    }
  });
</script>

<!-- Display this version on mobile? -->
<!-- <menu bind:this={menuElement} class="border-primary relative flex gap-4 border-t pt-2">
  <span
    bind:this={markerElement}
    style:transform={markerTransform}
    class="ease-in-out-back border-t-primary marker absolute top-0 h-0 w-0 border-t-8 border-r-8 border-l-8 border-r-transparent border-l-transparent transition-transform"
  ></span>
  {#each menu.menuItems as { title }}
    <li>{title}</li>
  {/each}
</menu> -->

<menu
  bind:this={menuElement}
  class="menu relative flex h-fit w-full justify-around gap-4 rounded-md bg-amber-50 px-4 py-2 text-sm"
>
  <span
    bind:this={markerElement}
    style:transform={markerTransform}
    class="ease-out-back marker bg-primary absolute top-0 left-0 h-full w-[2px] transition-transform duration-300"
  ></span>
  {#each menu.menuItems as { title }}
    <li>{title}</li>
  {/each}
</menu>

<style>
  .menu {
    box-shadow: inset 0px 2px 4px #00000080;
  }
</style>
