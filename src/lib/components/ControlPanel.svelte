<script lang="ts">
  import { usePower } from '$lib/shared/power.svelte';
  import Dial from './Dial.svelte';
  import ToggleButton from './ToggleButton.svelte';
  import { useMenu } from '$lib/shared/menu.svelte';

  const { isPowerOn } = usePower();
  const menu = useMenu();

  let upDial = $state(0);
  let downDial = $state(0);

  function handleToggle(isOn: boolean) {
    isPowerOn.value = isOn;
  }
</script>

<aside class="bg-metal-2 flex items-center justify-between border-t-2 border-white p-6">
  <div class="flex gap-4">
    <label class="flex flex-col items-center gap-2">
      Page
      <Dial bind:currentNotch={menu.selectedIndex.value} notches={menu.total} />
    </label>
    <label class="flex flex-col items-center gap-2">
      {upDial}
      <Dial direction="left" bind:currentNotch={upDial} />
    </label>
    <label class="flex flex-col items-center gap-2">
      {downDial}
      <Dial bind:currentNotch={downDial} />
    </label>
  </div>
  <ToggleButton isActive={isPowerOn.value} toggle={handleToggle} />
</aside>
