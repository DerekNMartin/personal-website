<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  const { data } = $props();
  const githubRepos = $derived(data.user.pinnedItems.nodes);

  let visible = $state(false);
  onMount(() => {
    visible = true;
  });
</script>

<section class="flex h-full flex-col gap-4">
  {#each githubRepos as item, index (item.id)}
    {#if visible}
      <a in:fade={{ delay: index * 100 }} href={item.url} target="_blank">
        <article
          class="border-secondary flex flex-col gap-2 rounded-tr-lg rounded-bl-lg border-2 p-4"
        >
          <h3 class="text-primary font-bold">
            {item.name}
          </h3>
          <p class="text-sm">{item.description}</p>
          <div class="flex flex-wrap gap-3">
            {#each item.languages.nodes as language (language.id)}
              <div class="flex items-center gap-1">
                <span class="h-2 w-2 rounded-full" style:background={language.color}></span>
                <span class="text-sm">{language.name}</span>
              </div>
            {/each}
          </div>
        </article>
      </a>
    {/if}
  {/each}
</section>
