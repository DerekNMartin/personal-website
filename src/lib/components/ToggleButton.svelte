<script lang="ts">
  let {
    isActive = $bindable(false),
    toggle
  }: { isActive?: boolean; toggle?: (isActive: boolean) => void } = $props();

  const toggleStateStyle = $derived(isActive ? 'button-toggle--on' : 'button-toggle--off');

  function handleToggle() {
    isActive = !isActive;
    if (toggle) toggle(isActive);
  }
</script>

<button
  class={['button-toggle', toggleStateStyle]}
  aria-label="ToggleButton"
  onclick={handleToggle}
>
  <span class={['button-toggle__text', ...(isActive ? ['button-toggle__text--on'] : [])]}>ON</span>
</button>

<style>
  @reference 'main-styles';

  .button-toggle {
    @apply ease-in-out-back bg-metal-1 h-16 w-16 cursor-pointer rounded-full font-bold text-neutral-300 transition-all duration-300;
  }
  .button-toggle--on {
    filter: blur(0.6px);
    box-shadow:
      inset 3px 4px 3px #00000030,
      5px 6px 2px #00000000,
      inset -6px -10px 5px -6px #ffffff;
  }
  .button-toggle--off {
    box-shadow:
      inset 2px 3px 1px #ffffff80,
      5px 6px 2px #00000040,
      inset -6px -10px 5px -6px #ffffff00;
  }
  .button-toggle__text {
    @apply text-neutral-300 transition-all;
  }
  .button-toggle__text--on {
    animation:
      text-flicker-in-glow 500ms linear both,
      pulse ease-in-out 1.5s alternate infinite;
  }

  @keyframes pulse {
    0% {
      filter: blur(0.5px);
      opacity: 0.8;
      text-shadow: 0 0 15px theme(color-primary);
    }
    100% {
      filter: blur(0.5px);
      opacity: 1;
      text-shadow: 0 0 20px theme(color-primary);
    }
  }

  @keyframes text-flicker-in-glow {
    0% {
      color: theme(color.neutral-300);
      text-shadow: none;
    }
    25% {
      color: theme(color.neutral-300);
      text-shadow: none;
    }
    25.1% {
      color: theme(color.primary);
      text-shadow: 0 0 8px theme(color-primary);
    }
    25.2% {
      color: theme(color.neutral-300);
      text-shadow: none;
    }
    25.3% {
      color: theme(color.primary);
      text-shadow: 0 0 18px theme(color-primary);
    }
    50% {
      color: theme(color.neutral-300);
      text-shadow: none;
    }
    75% {
      color: theme(color.neutral-300);
      text-shadow: none;
    }
    80% {
      color: theme(color.primary);
      text-shadow: 0 0 8px theme(color-primary);
    }
    90% {
      color: theme(color.neutral-300);
      text-shadow: none;
    }
    95% {
      color: theme(color.primary);
      text-shadow: 0 0 10px theme(color-primary);
    }
    95.4% {
      color: theme(color.neutral-300);
      text-shadow: none;
    }
    100% {
      color: theme(color.primary);
      filter: blur(0.5px);
      text-shadow: 0 0 18px theme(color-primary);
    }
  }
</style>
