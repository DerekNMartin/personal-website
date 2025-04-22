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
  {#if visible}
    {#each githubRepos as item, index (item.id)}
      <a
        in:fade|global={{ delay: index * 100 }}
        href={item.url}
        target="_blank"
        class="bg-secondary hover:outline-primary rounded-xl rounded-tl-none rounded-br-none hover:outline-4 focus-visible:outline-4"
      >
        <article class="project flex flex-col gap-2 p-4 text-white">
          <h3 class="text-primary text-lg font-bold">
            {item.name}
          </h3>
          <p>{item.description}</p>
          <div class="flex flex-wrap gap-4">
            {#each item.languages.nodes as language (language.id)}
              <div class="flex items-center gap-1">
                <span
                  class="h-3 w-3 rounded-sm rounded-tl-none rounded-br-none"
                  style:background={language.color}
                ></span>
                <span class="text-sm">{language.name}</span>
              </div>
            {/each}
          </div>
        </article>
      </a>
    {/each}
  {/if}
</section>

<style>
  article.project:hover {
    animation: flicker 50ms 2;
  }
</style>
