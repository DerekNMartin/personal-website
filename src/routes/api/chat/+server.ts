import SystemContext from '$lib/config/systemContext.md?raw';
import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

import { GEMINI_API_KEY } from '$env/static/private';

const aiModel = createGoogleGenerativeAI({ apiKey: GEMINI_API_KEY });

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
    model: aiModel('gemini-2.0-flash-lite'),
    system: SystemContext,
    messages
  });

  return result.toDataStreamResponse();
}
