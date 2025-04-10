import { STRAVA_ACCESS_TOKEN, STRAVA_ATHLETE_ID } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';

const stravaBaseUrl = new URL('https://www.strava.com/api/v3');

export const GET: RequestHandler = async () => {
  const url = new URL(`${stravaBaseUrl}/athletes/${STRAVA_ATHLETE_ID}/stats`);
  const res = await fetch(url.href, {
    headers: { Authorization: `Bearer ${STRAVA_ACCESS_TOKEN}` }
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'cache-control': 'private, max-age=3600' }
  });
};
