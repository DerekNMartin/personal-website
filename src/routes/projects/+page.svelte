<script lang="ts">
  const { data } = $props();
  const githubRepos = $derived(data.user.pinnedItems.nodes);
</script>

<section class="flex h-full flex-col gap-4 overflow-y-auto">
  {#each githubRepos as item}
    <a href={item.url} target="_blank">
      <article
        class="border-secondary flex flex-col gap-2 rounded-tr-lg rounded-bl-lg border-2 p-4"
      >
        <h3 class="font-bold">
          {item.name}
        </h3>
        <p>{item.description}</p>
      </article>
    </a>
  {/each}
</section>
