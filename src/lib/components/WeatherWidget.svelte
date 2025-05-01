<script lang="ts">
  import type { WeatherResponse } from '$lib/types/weather';
  import type { ClassValue } from 'svelte/elements';
  import Widget from './Widget.svelte';

  interface WeatherWidgetProps {
    weather: WeatherResponse;
    class?: ClassValue;
  }

  const { weather, ...props }: WeatherWidgetProps = $props();

  const weatherIcon = $derived(
    `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
  );
  const weatherType = weather.weather[0].main;
  const tempCelcius = $derived(Math.floor(weather.main.temp - 273.15));
  const tempFahrenheit = $derived(Math.floor((weather.main.temp - 273.15) * 1.8 + 32));
</script>

<Widget class="@container items-center sm:flex-row">
  <img src={weatherIcon} alt={weatherType} title={weatherType} class="weather__icon" />
  <div class="flex w-full flex-col gap-2">
    Toronto
    <div class="flex w-64 flex-col gap-4 @min-sm:flex-row">
      <h3 class="text-5xl font-bold">
        {tempCelcius}<sup class="align-super text-base font-normal">&deg;C</sup>
      </h3>
      <span class="hidden text-5xl font-light opacity-60 @min-sm:block">/</span>
      <h3 class="text-5xl font-light opacity-60 transition-opacity hover:opacity-100">
        {tempFahrenheit}<sup class="align-super text-base font-normal">&deg;F</sup>
      </h3>
    </div>
    {weatherType}
  </div>
</Widget>

<style>
  .weather__icon {
    filter: drop-shadow(0px 0px 15px rgba(255, 255, 255, 0.5));
    animation: float 1.5s ease-in-out infinite alternate;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(-8px);
    }
  }
</style>
