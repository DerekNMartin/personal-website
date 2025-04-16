<script lang="ts">
  import { onMount } from 'svelte';
  import { Tween } from 'svelte/motion';
  import { quartOut } from 'svelte/easing';
  import { usePower } from '$lib/shared/power.svelte';

  const { strava, ...props } = $props();
  const power = usePower();

  function interpolateRounded(fromNumber: number, toNumber: number) {
    return (t: number) => Math.floor(fromNumber + toNumber * t);
  }

  const tweenOptions = {
    delay: 600,
    duration: 1500,
    interpolate: interpolateRounded,
    easing: quartOut
  };

  const tweenDistance = new Tween(0, tweenOptions);
  const distance = $derived(Math.floor(strava?.all_run_totals?.distance / 1000) || 0); // Meters -> Kilometers

  const tweenTime = new Tween(0, tweenOptions);
  const time = $derived(Math.floor(strava?.all_run_totals?.moving_time / 60) || 0); // Seconds -> Minutes

  const tweenCount = new Tween(0, tweenOptions);
  const count = $derived(strava?.all_run_totals?.count || 0);

  $effect(() => {
    if (power.isOn) {
      tweenDistance.set(distance);
      tweenTime.set(time);
      tweenCount.set(count);
    } else {
      tweenDistance.set(0);
      tweenTime.set(0);
      tweenCount.set(0);
    }
  });

  const stats = $derived.by(() => {
    return [
      { label: 'kilometers', value: tweenDistance.current },
      { label: 'minutes', value: tweenTime.current },
      { label: 'count', value: tweenCount.current }
    ];
  });
</script>

<article class={['flex flex-col gap-4', props.class]}>
  Running
  <section class="grid grid-cols-3 gap-4">
    {#each stats as stat}
      <div class="flex flex-col gap-1">
        <p class="text-xs uppercase">[{stat.label}]</p>
        <p class="text-2xl font-bold">{stat.value}</p>
      </div>
    {/each}
    <a class="link" href="https://www.strava.com/athletes/136908952" target="_blank">Strava</a>
  </section>
</article>
