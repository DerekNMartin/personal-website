<script lang="ts">
  import type { Snapshot } from './$types';
  import type { ActionResult } from '@sveltejs/kit';
  import { enhance } from '$app/forms';
  import { scale } from 'svelte/transition';
  import { expoOut } from 'svelte/easing';
  import { onMount, tick } from 'svelte';
  import { useScroll } from '$lib/shared/scroll.svelte';

  interface Message {
    time: number;
    content?: string;
    role: 'user' | 'assistant' | 'system';
  }

  const scroll = useScroll();

  let messageViewport: HTMLElement | undefined = $state();
  let formElement: HTMLFormElement | undefined = $state();
  let isLoading = $state(false);

  let messages: Message[] = $state([]);
  export const snapshot: Snapshot<Message[]> = {
    capture: () => messages,
    restore: (value) => (messages = value)
  };

  onMount(() => {
    tick().then(() => {
      if (formElement && !messages.length) {
        const inputElement = formElement.getElementsByTagName('input').item(0);
        if (inputElement) {
          inputElement.value = 'Hello!';
          formElement.requestSubmit();
        }
      }
    });
  });

  $effect.pre(() => {
    handleScroll();
  });

  async function handleScroll() {
    if (!messageViewport || !messages.length) return;
    const shouldScroll =
      messageViewport.offsetHeight + messageViewport.scrollTop > messageViewport.scrollHeight - 100;
    if (shouldScroll) {
      await tick();
      messageViewport?.scrollTo({ top: messageViewport.scrollHeight, behavior: 'smooth' });
    }
  }

  function handleAddMessage(formData: FormData, formElement: HTMLFormElement) {
    isLoading = true;
    messages.push({
      time: Date.now(),
      content: formData.get('user-input')?.toString(),
      role: 'user'
    });
    formElement.reset();
    formData.append('messages', JSON.stringify(messages));
  }

  async function handleFormResult(result: ActionResult, formElement: HTMLFormElement) {
    isLoading = false;
    if (result.type === 'success' && result.data) {
      messages.push(result.data.message);
    }
    if (result.type === 'error') {
      messages.push({
        content: `Sorry, the bot is shy today. 🫣 If you have any questions for Derek, feel free to email Derek at derek.n.martin@gmail.com!`,
        role: 'system',
        time: Date.now()
      });
    }
    await tick();
    const inputElement = formElement.elements.namedItem('user-input') as HTMLInputElement;
    inputElement.focus();
  }
</script>

<div class="flex h-full flex-col justify-between gap-4 text-sm sm:text-base">
  <section
    bind:this={messageViewport}
    class="flex flex-1 flex-col gap-2 overflow-y-auto border-2 p-4"
  >
    {#each messages as message (message.time)}
      <p
        transition:scale={{ duration: 250, start: 0.6, easing: expoOut }}
        class={[
          'w-fit rounded-lg bg-neutral-200 px-4 py-2 text-white sm:max-w-1/2',
          message.role === 'user'
            ? 'bg-primary self-end rounded-tr-none rounded-bl-none'
            : 'bg-secondary self-start rounded-tl-none rounded-br-none'
        ]}
      >
        {message.content}
      </p>
    {/each}
    {#if isLoading}
      <div
        in:scale={{ duration: 150, start: 0.6, easing: expoOut, delay: 250 }}
        class={[
          'bg-secondary flex w-20 max-w-1/2 items-center justify-center self-start rounded-lg rounded-tl-none rounded-br-none p-4 text-white'
        ]}
      >
        <div class="loader"></div>
      </div>
    {/if}
  </section>
  <section>
    <form
      bind:this={formElement}
      method="POST"
      onsubmit={() => false}
      use:enhance={({ formData, formElement }) => {
        handleAddMessage(formData, formElement);
        return async ({ result }) => handleFormResult(result, formElement);
      }}
      class="relative flex"
    >
      <input
        name="user-input"
        type="text"
        required
        disabled={isLoading}
        class="focus:outline-primary w-full border-2 px-2 py-4 pr-16 sm:p-4 sm:pr-20"
        placeholder="What would you like to know about Derek?"
      />
      <button
        class="bg-secondary hover:bg-primary hover:text-secondary absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-sm rounded-tl-none rounded-br-none px-2 py-1 text-sm font-bold text-white uppercase transition-colors"
        type="submit"
      >
        [Send]
      </button>
    </form>
  </section>
</div>

<style>
  .loader,
  .loader:before,
  .loader:after {
    --width: 0.8rem;
    --gap: 0.4rem;
    width: var(--width);
    aspect-ratio: 1;
    /* box-shadow: 0 0 0 2px inset #fff; */
    background: #fff;
    position: relative;
    animation: 1s infinite 0.5s;
    animation-name: l7-1, l7-2;
  }
  .loader:before,
  .loader:after {
    content: '';
    position: absolute;
    left: calc(100% + var(--gap));
    animation-delay: 0.5s, 0s;
  }
  .loader:after {
    left: calc((var(--width) + var(--gap)) * -1);
    animation-delay: 0s, 0.5s;
  }
  @keyframes l7-1 {
    0%,
    55%,
    100% {
      border-top-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    20%,
    30% {
      border-top-left-radius: 30%;
      border-bottom-right-radius: 30%;
    }
  }
  @keyframes l7-2 {
    0%,
    55%,
    100% {
      border-bottom-left-radius: 0;
      border-top-right-radius: 0;
    }
    20%,
    30% {
      border-bottom-left-radius: 30%;
      border-top-right-radius: 30%;
    }
  }
</style>
