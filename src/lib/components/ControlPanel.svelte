<script lang="ts">
  import { usePower } from '$lib/shared/power.svelte';
  import { useMenu } from '$lib/shared/menu.svelte';
  import { useScroll } from '$lib/shared/scroll.svelte';

  import Speaker from './Speaker.svelte';

  import Dial from './Dial.svelte';
  import ToggleButton from './ToggleButton.svelte';
  import MenuDisplay from './MenuDisplay.svelte';

  const power = usePower();
  function handleToggle(isOn: boolean) {
    power.isOn = isOn;
  }

  const scroll = useScroll();
  let upDial: Dial;
  let downDial: Dial;
  let scrollDial = $state(0);
  scroll.totalChunks = 5;
  function handleScrollDial(dialNotch: number) {
    scroll.currentChunk = dialNotch;
  }
  function resetDials() {
    upDial.resetDial();
    downDial.resetDial();
  }

  const menu = useMenu();
  function handlePageDial(dialNotch: number) {
    menu.navigateToIndex(dialNotch);
    resetDials();
  }
</script>

<aside
  class="bg-metal-2 flex flex-wrap items-center justify-between gap-4 border-t-2 border-white p-6"
>
  <Speaker width="256" class="hidden sm:block" />
  <div class="flex flex-1 items-end gap-4 sm:flex-none">
    <label class="dial-label">
      Page
      <Dial
        currentNotch={menu.pageIndex}
        onRotate={handlePageDial}
        notches={menu.total}
        notchColour="bg-primary"
      />
    </label>
    <MenuDisplay />
  </div>
  <div class="flex gap-4">
    <label class="dial-label">
      Up
      <Dial
        bind:this={upDial}
        direction="left"
        bind:currentNotch={scrollDial}
        onRotate={handleScrollDial}
        notches={scroll.totalChunks}
      />
    </label>
    <label class="dial-label">
      Down
      <Dial
        bind:this={downDial}
        bind:currentNotch={scrollDial}
        onRotate={handleScrollDial}
        notches={scroll.totalChunks}
      />
    </label>
  </div>
  <ToggleButton isActive={power.isOn} toggle={handleToggle} />
</aside>

<style>
  @reference 'main-styles';

  .dial-label {
    @apply flex flex-col items-center gap-2 text-xs text-neutral-600 uppercase;
  }
</style>
