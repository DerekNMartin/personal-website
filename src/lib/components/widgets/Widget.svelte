<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';
  import { expoOut, circOut } from 'svelte/easing';

  export interface WidgetProps {
    link?: string;
    linkText?: string;
    heading?: Snippet;
    headingText?: string;
    children?: Snippet;
    class?: ClassValue;
    backgroundTransition?: { delay?: number; duration?: number };
    contentTransition?: { delay?: number; duration?: number };
  }
  const {
    heading,
    link,
    linkText,
    headingText,
    children,
    backgroundTransition,
    contentTransition,
    ...props
  }: WidgetProps = $props();

  function backgroundGrow(node: HTMLElement) {
    return {
      delay: backgroundTransition?.delay || 1000,
      duration: backgroundTransition?.duration || 500,
      easing: expoOut,
      css: (t: number) => `transform-origin: top; transform: scaleY(${t})`
    };
  }

  function contentGrow(node: HTMLElement) {
    return {
      delay: contentTransition?.delay || 1400,
      duration: contentTransition?.duration || 300,
      easing: circOut,
      css: (t: number) => `opacity: ${t}; transform: scale(${t})`
    };
  }
</script>

<article
  in:backgroundGrow
  class="bg-secondary mb-5 min-h-28 w-full break-inside-avoid-column rounded-3xl rounded-tl-none rounded-br-none p-6 text-white"
>
  <div class={['flex flex-col gap-4', props.class]} in:contentGrow>
    {#if heading}
      {@render heading()}
    {:else if headingText}
      <h3>{headingText}</h3>
    {/if}
    {#if children}
      {@render children()}
    {/if}
    {#if link}
      <a class="link" href={link} target="_blank">{linkText}</a>
    {/if}
  </div>
</article>
