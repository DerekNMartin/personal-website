import type { WeatherResponse } from '$lib/types/weather';
import { OPEN_WEATHER_API_KEY } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.searchParams.append('appid', OPEN_WEATHER_API_KEY);
  // Toronto Lat/Lon
  url.searchParams.append('lat', '43.6534817');
  url.searchParams.append('lon', '-79.3839347');

  const response = await fetch(url.href);
  const data: WeatherResponse = await response.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'cache-control': 'private, max-age=3600' }
  });
};
