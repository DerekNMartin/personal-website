<script lang="ts">
  import Dial from './Dial.svelte';
  import Button from './Button.svelte';

  let pageDial = $state(1);

  let upDial = $state(0);
  let downDial = $state(0);
</script>

<aside class="flex items-center justify-between border-t-2 border-white bg-[#E3E5E6] p-6">
  <div class="flex gap-4">
    <label class="flex flex-col items-center gap-2">
      {pageDial}
      <Dial bind:currentNotch={pageDial} />
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
  <Button />
</aside>
