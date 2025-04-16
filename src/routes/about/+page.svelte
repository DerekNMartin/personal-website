<script lang="ts">
  import { Chat } from '@ai-sdk/svelte';
  import { scale, fade } from 'svelte/transition';
  import { expoOut } from 'svelte/easing';
  import { onMount, tick } from 'svelte';
  import { useScroll } from '$lib/shared/scroll.svelte';

  const errorMessage = `Sorry, the bot is shy today. 🫣 If you have any questions for Derek, feel free to email Derek at derek.n.martin@gmail.com!`;

  const chat = new Chat({
    onError: (error) => {
      console.error('An error occurred:', error);
      chat.messages.push({
        id: Date.now().toString(),
        content: errorMessage,
        role: 'system',
        parts: [
          {
            type: 'text',
            text: errorMessage
          }
        ]
      });
    }
  });
  const scroll = useScroll();

  let messageViewport: HTMLElement | undefined = $state();
  let isLoading = $state(false);

  onMount(() => {
    if (chat && !chat.messages.length) {
      chat.input = 'Hello!';
      chat.handleSubmit();
    }
  });

  $effect.pre(() => {
    handleScroll();
  });

  async function handleScroll() {
    if (!messageViewport || !chat.messages.length) return;
    const shouldScroll =
      messageViewport.offsetHeight + messageViewport.scrollTop > messageViewport.scrollHeight - 100;
    if (shouldScroll) {
      await tick();
      messageViewport?.scrollTo({ top: messageViewport.scrollHeight, behavior: 'smooth' });
    }
  }
</script>

<div class="flex h-full flex-col justify-between gap-4 text-sm sm:text-base">
  <section
    bind:this={messageViewport}
    class="flex flex-1 flex-col gap-2 overflow-y-auto border-2 p-4"
  >
    {#each chat.messages as message (message.id)}
      <div
        transition:scale={{ duration: 250, start: 0.6, easing: expoOut }}
        class={[
          'rounded-lg bg-neutral-200 px-4 py-2 text-white sm:max-w-1/2',
          ...((!message.content && ['flex w-20 items-center justify-center']) || []),
          message.role === 'user'
            ? 'bg-primary self-end rounded-tr-none rounded-bl-none'
            : 'bg-secondary self-start rounded-tl-none rounded-br-none'
        ]}
      >
        {#if message.content}
          <div in:fade>
            {#each message.parts as part, partIndex (partIndex)}
              {#if part.type === 'text'}
                <div>{part.text}</div>
              {/if}
            {/each}
          </div>
        {:else}
          <div in:fade class="loader"></div>
        {/if}
      </div>
    {/each}
  </section>
  <section>
    <form onsubmit={chat.handleSubmit} class="relative flex">
      <input
        bind:value={chat.input}
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
