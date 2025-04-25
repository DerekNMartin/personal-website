import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import type { SpotifyCurrentlyPlayingResponse } from '$lib/types/spotify';
import redis from '$lib/shared/redis';

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

const REDIS_REFRESH_TOKEN_KEY = 'spotify_refresh_token';

const spotifyAccountsUrl = new URL('https://accounts.spotify.com/api/token');
const spotifyApiUrl = new URL('https://api.spotify.com/v1');

const base64Credentials = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

let accessToken: string;

async function refreshToken() {
  const refreshToken = await redis.get(REDIS_REFRESH_TOKEN_KEY);
  spotifyAccountsUrl.searchParams.append('grant_type', 'refresh_token');
  spotifyAccountsUrl.searchParams.append('refresh_token', refreshToken);

  const response = await fetch(spotifyAccountsUrl.href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${base64Credentials}`
    }
  });
  const data: TokenResponse = await response.json();
  console.log('Spotify Token Refreshed');
  return data;
}

export const GET: RequestHandler = async () => {
  if (!accessToken) accessToken = (await refreshToken()).access_token;

  const url = new URL(`${spotifyApiUrl.href}/me/player/currently-playing`);
  const res = await fetch(url.href, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    console.error(res);
    return new Response(JSON.stringify({ message: 'Error retrieving Spotify data' }), {
      status: res.status
    });
  }

  if (res.ok && res.status === 204) {
    return new Response(JSON.stringify({ status: res.status, error: 'Nothing Playing' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const data: SpotifyCurrentlyPlayingResponse = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'cache-control': 'private, max-age=3600' }
  });
};
