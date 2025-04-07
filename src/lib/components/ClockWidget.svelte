<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  const LOCALE = 'en-CA';
  const TIME_ZONE = 'America/Toronto';

  const props = $props();

  let unixTime = $state(Date.now());
  const date = $derived(new Date(unixTime));

  function formatLocale(options: Intl.DateTimeFormatOptions) {
    return date.toLocaleString(LOCALE, {
      timeZone: TIME_ZONE,
      hour12: false,
      ...options
    });
  }

  const timeHours = $derived(Number(formatLocale({ hour: 'numeric' })) % 12 || 12);
  const timeMinutes = $derived(Number(formatLocale({ minute: 'numeric' })));
  const timeSeconds = $derived(Number(formatLocale({ second: 'numeric' })));
  const dateFormatted = $derived(formatLocale({ dateStyle: 'long' }));
  const dayNight = $derived.by(() => {
    const amPm = formatLocale({ hour: 'numeric', hour12: true }).split(/\d\s/)[1];
    return amPm.includes('a') ? '☀️' : '🌙';
  });

  let secondsArray: number[] = $state([]);

  function tick() {
    unixTime = Date.now();
    secondsArray.push(timeSeconds);
    secondsArray.shift();
  }

  onMount(() => {
    secondsArray = [timeSeconds + 1, timeSeconds, timeSeconds - 1];
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  });
</script>

<article class={['flex flex-col gap-4', props.class]}>
  <section class="flex w-full justify-between">
    <p class="text-sm">Toronto {dayNight}</p>
    <p class="text-sm">GMT-4</p>
  </section>
  <section class="grid grid-cols-2 grid-rows-2 items-center">
    {#key timeHours}
      <p in:fly={{ y: '100%' }} class="thing text-6xl">{timeHours.toString().padStart(2, '0')}</p>
    {/key}
    <p class="text-2xl">{dateFormatted}</p>
    {#key timeMinutes}
      <p in:fly={{ y: '100%' }} class="text-6xl">
        {timeMinutes.toString().padStart(2, '0')}
      </p>
    {/key}
    <section class="relative flex max-h-16 flex-col justify-center overflow-hidden">
      <span class="from-secondary absolute top-0 z-10 h-6 w-full bg-linear-to-b to-transparent"
      ></span>
      {#each secondsArray as second (second)}
        <p class="clock-second text-4xl">{second.toString().padStart(2, '0')}</p>
      {/each}
      <span class="from-secondary absolute bottom-0 z-10 h-6 w-full bg-linear-to-t to-transparent"
      ></span>
    </section>
  </section>
</article>

<style>
  @reference 'main-styles';
  .clock-second {
    will-change: transform;
    animation: scrolling 1000ms infinite;
    animation-timing-function: var(--ease-out-expo);
  }

  @keyframes scrolling {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }
</style>
