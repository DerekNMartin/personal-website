import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  async function fetchStrava() {
    const response = await fetch('/api/strava');
    const result = await response.json();
    if (!response.ok) throw new Error(result.status_message || 'Something went wrong');
    return result;
  }
  const strava = await fetchStrava();

  setHeaders({ 'cache-control': 'private, max-age=3600' });
  return { strava };
};
