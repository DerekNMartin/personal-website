import type { FableBooksResponse } from '$lib/types/fable';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const url = new URL(
    'https://api.fable.co/api/v2/users/3c147b4b-b66e-485e-a8f1-c4065cc8a68e/book_lists/3f9bb88e-2e40-495e-bcc9-fee089184313/books?limit=10'
  );

  const response = await fetch(url.href);
  const data: FableBooksResponse = await response.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'cache-control': 'private, max-age=3600' }
  });
};
