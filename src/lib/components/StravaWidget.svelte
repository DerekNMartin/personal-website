<script lang="ts">
  import { onMount } from 'svelte';
  import { Tween } from 'svelte/motion';
  import { quartOut } from 'svelte/easing';

  const { strava, ...props } = $props();

  function interpolateRounded(fromNumber: number, toNumber: number) {
    return (t: number) => Math.floor(fromNumber + toNumber * t);
  }

  const tweenOptions = {
    delay: 1000,
    duration: 1500,
    interpolate: interpolateRounded,
    easing: quartOut
  };

  const tweenDistance = new Tween(0, tweenOptions);
  const distance = $derived(Math.floor(strava.all_run_totals.distance / 1000)); // Meters -> Kilometers

  const tweenTime = new Tween(0, tweenOptions);
  const time = $derived(Math.floor(strava.all_run_totals.moving_time / 60)); // Seconds -> Minutes

  const tweenCount = new Tween(0, tweenOptions);
  const count = $derived(strava.all_run_totals.count);

  onMount(() => {
    tweenDistance.set(distance);
    tweenTime.set(time);
    tweenCount.set(count);
  });

  const stats = $derived.by(() => {
    return [
      { label: 'count', value: tweenCount.current },
      { label: 'minutes', value: tweenTime.current },
      { label: 'kilometers', value: tweenDistance.current }
    ];
  });
</script>

<article class={['flex flex-col gap-4', props.class]}>
  Running
  <section class="grid grid-cols-3 gap-4">
    {#each stats as stat}
      <div class="flex flex-col gap-1">
        <p class="text-xs uppercase">[{stat.label}]</p>
        <p class="text-2xl">{stat.value}</p>
      </div>
    {/each}
    <a class="link" href="https://www.strava.com/athletes/136908952" target="_blank">Strava</a>
  </section>
</article>
