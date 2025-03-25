<script lang="ts">
  import { usePower } from '$lib/shared/power.svelte';
  import Dial from './Dial.svelte';
  import ToggleButton from './ToggleButton.svelte';
  import { useMenu } from '$lib/shared/menu.svelte';

  const power = usePower();
  const menu = useMenu();

  let upDial = $state(0);
  let downDial = $state(0);

  function handleToggle(isOn: boolean) {
    power.isOn = isOn;
  }

  function handlePageDial(dialNotch: number) {
    menu.navigateToIndex(dialNotch);
  }
</script>

<aside class="bg-metal-2 flex items-center justify-between border-t-2 border-white p-6">
  <div class="flex gap-4">
    <label class="dial-label">
      Page
      <Dial
        currentNotch={menu.pageIndex}
        onRotate={handlePageDial}
        notches={menu.total}
        notchColour="bg-primary"
      />
    </label>
    <label class="dial-label">
      Up
      <Dial direction="left" bind:currentNotch={upDial} />
    </label>
    <label class="dial-label">
      Down
      <Dial bind:currentNotch={downDial} />
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
