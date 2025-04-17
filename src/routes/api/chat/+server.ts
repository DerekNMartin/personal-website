import SystemContext from '$lib/config/systemContext.md?raw';
import { streamText, simulateReadableStream } from 'ai';
import { dev } from '$app/environment';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { MockLanguageModelV1 } from 'ai/test';

import { GEMINI_API_KEY } from '$env/static/private';

const aiModel = createGoogleGenerativeAI({ apiKey: GEMINI_API_KEY });

const mockedModel = new MockLanguageModelV1({
  doStream: async () => ({
    stream: simulateReadableStream({
      chunks: [
        { type: 'text-delta', textDelta: 'Hello' },
        { type: 'text-delta', textDelta: ', ' },
        { type: 'text-delta', textDelta: `world!` },
        {
          type: 'finish',
          finishReason: 'stop',
          logprobs: undefined,
          usage: { completionTokens: 10, promptTokens: 3 }
        }
      ],
      chunkDelayInMs: 300
    }),
    rawCall: { rawPrompt: null, rawSettings: {} }
  })
});

// For Debugging
function errorHandler(error: unknown) {
  if (error == null) return 'unknown error';
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return JSON.stringify(error);
}

export async function POST({ request }) {
  const { messages } = await request.json();

  const result = streamText({
    model: dev ? mockedModel : aiModel('gemini-2.0-flash-lite'),
    system: SystemContext,
    messages
  });

  return result.toDataStreamResponse({
    ...(dev && { getErrorMessage: errorHandler })
  });
}
