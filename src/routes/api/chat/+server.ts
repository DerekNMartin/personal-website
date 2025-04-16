import SystemContext from '$lib/config/systemContext.md?raw';
import { streamText } from 'ai';
import { createXai } from '@ai-sdk/xai';

import { XAI_API_KEY } from '$env/static/private';

const xai = createXai({ apiKey: XAI_API_KEY });

// For Debugging
// function errorHandler(error: unknown) {
//   if (error == null) return 'unknown error';
//   if (typeof error === 'string') return error;
//   if (error instanceof Error) return error.message;
//   return JSON.stringify(error);
// }

export async function POST({ request }) {
  const { messages } = await request.json();

  const result = streamText({
    model: xai('grok-3-mini'),
    system: SystemContext,
    messages
  });
  return result.toDataStreamResponse();
}
