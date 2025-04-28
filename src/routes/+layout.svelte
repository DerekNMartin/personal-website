<script lang="ts">
  import '../app.css';

  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import { dev } from '$app/environment';
  import { page } from '$app/state';
  import { fade, blur } from 'svelte/transition';

  import { usePower } from '$lib/shared/power.svelte';
  import { useScroll } from '$lib/shared/scroll.svelte';

  import ControlPanel from '$lib/components/ControlPanel.svelte';
  import Header from '$lib/components/Header.svelte';
  import { onMount } from 'svelte';

  let { children } = $props();

  injectAnalytics({ mode: dev ? 'development' : 'production' });

  const power = usePower();
  const screenStyle = $derived(power.isOn ? 'on' : 'off');
  export const { snapshot } = power;

  const scroll = useScroll();

  const pageId = $derived(page.route.id);

  // TODO: fixes dials but yucky, able to do with only CSS?
  const contentStyle = $derived.by(() => {
    const classList = ['flex-1'];
    if (page.route.id === '/about')
      classList.push('max-h-[calc(100%+3.5rem+2rem)] overflow-hidden');
    return classList;
  });

  let hideInitialAnimation = $state(true);
  onMount(() => {
    // Hide off animation on first load
    setTimeout(() => (hideInitialAnimation = false), 750);
  });
</script>

<main class="flex h-full flex-col">
  <section class="bg-metal-2 box flex-1 border-b-2 border-b-neutral-800 p-6 sm:p-10">
    <div class="relative h-full overflow-hidden rounded-4xl border-8 border-black">
      {#if power.isOn}
        <div transition:fade class="noise-overlay"></div>
        <div class="refresh"></div>
      {/if}
      <div class="crt">
        <div
          bind:this={scroll.element}
          class={[
            'flex h-full w-full flex-col gap-4 overflow-y-auto bg-amber-100 px-4 py-6 sm:gap-8 sm:p-12',
            screenStyle
          ]}
          class:hide-initial-animation={hideInitialAnimation}
        >
          <Header></Header>
          {#key pageId}
            <div in:blur class={contentStyle}>
              {@render children()}
            </div>
          {/key}
        </div>
      </div>
    </div>
  </section>
  <ControlPanel />
</main>

<style>
  @reference 'main-styles';

  .hide-initial-animation {
    visibility: hidden;
  }

  .noise-overlay {
    @apply pointer-events-none absolute inset-0 z-50 opacity-10 mix-blend-soft-light;
    background-image: url('$lib/assets/noise.gif');
  }

  .refresh {
    @apply absolute bottom-0 left-0 z-10 h-16 w-full opacity-10;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0,
      rgba(255, 255, 255, 0.4) 10%,
      rgba(0, 0, 0, 0.1) 100%
    );
    animation: refresh 10s linear infinite;
  }

  .on {
    animation: 2000ms linear normal forwards 1 running on;
  }
  .off {
    animation: 750ms cubic-bezier(0.23, 1, 0.32, 1) 0ms normal forwards 1 running off;
  }

  .crt {
    @apply absolute top-0 left-0 z-[1] flex h-full w-full;
  }
  /* disable allow or disable pointer events */
  .crt::after {
    @apply pointer-events-none absolute top-0 left-0 h-full w-full;
    content: '';
    background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/86186/crt.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .crt::before {
    @apply pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[2];
    content: '';
    background:
      linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
      linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    background-size:
      100% 2px,
      3px 100%;
  }

  @keyframes on {
    0% {
      transform: scale(1, 0.8) translate3d(0, 0, 0);
      filter: brightness(4);
      opacity: 1;
    }
    3.5% {
      transform: scale(1, 0.8) translate3d(0, 100%, 0);
    }
    3.6% {
      transform: scale(1, 0.8) translate3d(0, -100%, 0);
      opacity: 1;
    }
    9% {
      transform: scale(1.3, 0.6) translate3d(0, 100%, 0);
      filter: brightness(4);
      opacity: 0;
    }
    11% {
      transform: scale(1, 1) translate3d(0, 0, 0);
      filter: contrast(0) brightness(0);
      opacity: 0;
    }
    100% {
      transform: scale(1, 1) translate3d(0, 0, 0);
      filter: contrast(1) brightness(1.2) saturate(1.3);
      opacity: 1;
    }
  }

  @keyframes off {
    0% {
      transform: scale(1, 1);
      filter: brightness(1);
    }
    40% {
      transform: scale(1, 0.005);
      filter: brightness(100);
    }
    70% {
      transform: scale(1, 0.005);
    }
    90% {
      transform: scale(0.005, 0.005);
    }
    100% {
      transform: scale(0, 0);
    }
  }

  @keyframes refresh {
    0%,
    70% {
      bottom: 100%;
    }
    100% {
      bottom: 0px;
    }
  }
</style>
