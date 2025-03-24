<script lang="ts">
  interface DialProps {
    currentNotch?: number;
    notches?: number;
    direction?: 'left' | 'right';
  }

  let { currentNotch = $bindable(0), notches = 10, direction = 'right' }: DialProps = $props();

  // Keep track of total rotations to be able to rotate continuously
  let totalRotations = $state(currentNotch);

  const currentRotation = $derived.by(() => {
    const rotationAmount = 360 / notches;
    return rotationAmount * totalRotations;
  });
  const rotateStyle = $derived(`${currentRotation}deg`);

  function handleRotate() {
    const dirNum = direction === 'right' ? 1 : -1;
    currentNotch += dirNum;
    totalRotations += dirNum;
    if (currentNotch >= notches) currentNotch = 0;
    if (currentNotch < 0) currentNotch = notches - 1;
  }
</script>

<div class="dial-wrapper">
  <button
    style:rotate={rotateStyle}
    class="dial dial-transition dial-mask"
    onclick={handleRotate}
    aria-label="Dial"
  >
    <span
      class="absolute top-1.5 right-1/2 block h-3 w-[3px] translate-x-1/2 rounded-full bg-neutral-700"
    ></span>
  </button>
  <span class="dial-shadow dial-transition dial-mask" style:rotate={rotateStyle}></span>
  <span class="dial-highlight dial-transition dial-mask" style:rotate={rotateStyle}></span>
</div>

<style>
  @reference 'main-styles';

  .dial-wrapper {
    @apply relative h-10 w-10;
  }
  .dial {
    @apply bg-metal-1 absolute z-[1] h-full w-full cursor-pointer rounded-full;
  }
  .dial-highlight {
    @apply absolute right-[1px] bottom-[3px] h-full w-full rounded-full bg-white;
  }
  .dial-shadow {
    @apply absolute top-1 left-0.5 h-full w-full rounded-full bg-black opacity-40 blur-sm;
  }
  .dial-transition {
    @apply ease-in-out-back transition-transform duration-300;
  }
  .dial-mask {
    mask: url('$lib/assets/dial_star.svg') center no-repeat;
  }
</style>
