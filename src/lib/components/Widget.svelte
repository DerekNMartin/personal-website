<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  interface WidgetProps {
    link?: string;
    linkText?: string;
    heading?: Snippet;
    headingText?: string;
    children?: Snippet;
    class?: ClassValue;
  }
  const { heading, link, linkText, headingText, children, ...props }: WidgetProps = $props();
</script>

<article
  class={[
    'bg-secondary mb-5 flex min-h-28 w-full break-inside-avoid-column flex-col gap-4 rounded-3xl rounded-tl-none rounded-br-none p-6 text-white',
    props.class
  ]}
>
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
</article>
