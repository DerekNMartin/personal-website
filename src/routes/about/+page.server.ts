import type { Actions } from './$types';
import { error } from '@sveltejs/kit';
import { InferenceClient } from '@huggingface/inference';
import { HUGGING_FACE_ACCESS_TOKEN } from '$env/static/private';
import SystemContext from '$lib/config/systemContext.md?raw';

const hf = new InferenceClient(HUGGING_FACE_ACCESS_TOKEN);

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const messages = JSON.parse(data.get('messages'));
    try {
      const response = await hf.chatCompletion({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [{ role: 'system', content: SystemContext }, ...messages],
        max_tokens: 1024
      });
      return {
        message: { ...response.choices[0].message, time: Date.now() }
      };
    } catch (err) {
      if (err?.message.includes('exceeded')) {
        error(503, err.message);
      }
      error(500, err?.message || 'Something went wrong!');
    }
  }
} satisfies Actions;
