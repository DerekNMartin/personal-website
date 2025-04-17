<script lang="ts">
  import { scale, fade } from 'svelte/transition';
  import { expoOut } from 'svelte/easing';
  import type { Chat, UIMessage } from '@ai-sdk/svelte';

  const {
    message,
    status,
    isLast
  }: { message: UIMessage; status: Chat['status']; isLast?: boolean } = $props();

  const isLoading = $derived(status === 'streaming');
</script>

<div
  transition:scale={{ duration: 250, start: 0.6, easing: expoOut }}
  class={[
    'rounded-lg bg-neutral-200 px-4 py-2 text-white sm:max-w-1/2',
    message.role === 'user'
      ? 'bg-primary self-end rounded-tr-none rounded-bl-none'
      : 'bg-secondary self-start rounded-tl-none rounded-br-none'
  ]}
>
  {#if isLoading && isLast}
    <div in:fade class="px-4">
      <div class="loader"></div>
    </div>
  {:else}
    <div in:fade>
      {#each message.parts as part, partIndex (partIndex)}
        {#if part.type === 'text'}
          <div>{part.text}</div>
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  .loader,
  .loader:before,
  .loader:after {
    --width: 0.8rem;
    --gap: 0.4rem;
    width: var(--width);
    aspect-ratio: 1;
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
