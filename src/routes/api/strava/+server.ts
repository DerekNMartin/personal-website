import {
  STRAVA_ATHLETE_ID,
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_REFRESH_TOKEN
} from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import { readTokens, writeTokens } from '$lib/server/stravaTokenStore';

export interface TokenResponse {
  token_type: string;
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
}

const stravaBaseUrl = new URL('https://www.strava.com/api/v3');

async function createRefreshToken(NEW_REFRESH_TOKEN?: string) {
  const requestTokenUrl = new URL(`${stravaBaseUrl}/oauth/token`);
  requestTokenUrl.searchParams.append('client_id', STRAVA_CLIENT_ID);
  requestTokenUrl.searchParams.append('client_secret', STRAVA_CLIENT_SECRET);
  requestTokenUrl.searchParams.append('grant_type', 'refresh_token');
  requestTokenUrl.searchParams.append('refresh_token', NEW_REFRESH_TOKEN || STRAVA_REFRESH_TOKEN);
  const permissionResponse = await fetch(requestTokenUrl.href, { method: 'POST' });
  const data: TokenResponse = await permissionResponse.json();
  console.log('Token Refreshed', data);
  return data;
}

export const GET: RequestHandler = async () => {
  let { access_token, refresh_token, expires_at } = await readTokens();
  const now = Math.floor(Date.now() / 1000);
  if (expires_at < now) {
    const token = await createRefreshToken(refresh_token);
    access_token = token.access_token;
    refresh_token = token.refresh_token;
    expires_at = token.expires_at;

    await writeTokens({ access_token, refresh_token, expires_at });
  }

  const url = new URL(`${stravaBaseUrl}/athletes/${STRAVA_ATHLETE_ID}/stats`);
  const res = await fetch(url.href, {
    headers: { Authorization: `Bearer ${access_token}` }
  });
  const data = await res.json();

  if (!res.ok) {
    return new Response(
      JSON.stringify({ message: data?.message || 'Error retrieving Strava data' }),
      {
        status: res.status
      }
    );
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'cache-control': 'private, max-age=3600' }
  });
};
