<script lang="ts">
  import { Chat } from '@ai-sdk/svelte';
  import { onMount, tick } from 'svelte';
  import { useScroll } from '$lib/shared/scroll.svelte';
  import ChatForm from '$lib/components/ChatForm.svelte';
  import ChatMessage from '$lib/components/ChatMessage.svelte';

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

  onMount(() => {
    if (chat && !chat.messages.length) {
      chat.input = 'Hello!';
      chat.handleSubmit();
    }
  });

  $effect(() => {
    handleScroll();
  });

  async function handleScroll() {
    if (!messageViewport || chat.status === 'submitted') return;
    const shouldScroll =
      messageViewport.offsetHeight + messageViewport.scrollTop > messageViewport.scrollHeight - 100;
    if (shouldScroll) {
      messageViewport?.scrollTo({ top: messageViewport.scrollHeight, behavior: 'smooth' });
    }
  }
</script>

<div class="flex h-full flex-col justify-between gap-4 text-sm sm:text-base">
  <section
    bind:this={messageViewport}
    class="flex flex-1 flex-col gap-2 overflow-y-auto border-2 p-4"
  >
    {#each chat.messages as message, index (message.id)}
      <ChatMessage {message} status={chat.status} isLast={index === chat.messages.length - 1} />
    {/each}
  </section>
  <section>
    <ChatForm submit={chat.handleSubmit} bind:input={chat.input} />
  </section>
</div>
