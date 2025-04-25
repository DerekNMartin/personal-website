import {
  STRAVA_ATHLETE_ID,
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_REFRESH_TOKEN
} from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import redis from '$lib/shared/redis';

export interface TokenResponse {
  token_type: string;
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
}

const REDIS_ACCESS_TOKEN_KEY = 'access_token';
const REDIS_REFRESH_TOKEN_KEY = 'refresh_token';
const REDIS_EXPIRE_TOKEN_KEY = 'expires_at';

const stravaBaseUrl = new URL('https://www.strava.com/api/v3');

async function createRefreshToken(NEW_REFRESH_TOKEN?: string) {
  const requestTokenUrl = new URL(`${stravaBaseUrl}/oauth/token`);
  requestTokenUrl.searchParams.append('client_id', STRAVA_CLIENT_ID);
  requestTokenUrl.searchParams.append('client_secret', STRAVA_CLIENT_SECRET);
  requestTokenUrl.searchParams.append('grant_type', 'refresh_token');
  requestTokenUrl.searchParams.append('refresh_token', NEW_REFRESH_TOKEN || STRAVA_REFRESH_TOKEN);
  const permissionResponse = await fetch(requestTokenUrl.href, { method: 'POST' });
  const data: TokenResponse = await permissionResponse.json();
  console.log('Strava Token Refreshed');
  return data;
}

async function getToken() {
  const [accessToken, refreshToken, expiresAtToken] = await Promise.all([
    redis.get(REDIS_ACCESS_TOKEN_KEY),
    redis.get(REDIS_REFRESH_TOKEN_KEY),
    redis.get(REDIS_EXPIRE_TOKEN_KEY)
  ]);
  return { accessToken, refreshToken, expiresAtToken };
}

async function setToken(access_token: string, refresh_token: string, expires_at: number) {
  await Promise.all([
    redis.set(REDIS_ACCESS_TOKEN_KEY, access_token),
    redis.set(REDIS_REFRESH_TOKEN_KEY, refresh_token),
    redis.set(REDIS_EXPIRE_TOKEN_KEY, expires_at)
  ]);
}

async function checkTokenExpiration() {
  const now = Math.floor(Date.now() / 1000);
  const { expiresAtToken } = await getToken();
  if (expiresAtToken < now) {
    const { refreshToken } = await getToken();
    const token = await createRefreshToken(refreshToken);
    await setToken(token.access_token, token.refresh_token, token.expires_at);
  }
}

export const GET: RequestHandler = async () => {
  await checkTokenExpiration();

  const { accessToken } = await getToken();
  const url = new URL(`${stravaBaseUrl}/athletes/${STRAVA_ATHLETE_ID}/stats`);
  const res = await fetch(url.href, {
    headers: { Authorization: `Bearer ${accessToken}` }
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
