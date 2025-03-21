<script lang="ts">
  import '../app.css';
  import ControlPanel from '$lib/components/ControlPanel.svelte';

  let { children } = $props();
</script>

<main class="flex h-full flex-col-reverse">
  <ControlPanel />
  <section class="flex-1 border-b-2 border-b-neutral-800 bg-[#E3E5E6] p-6">
    <div class="h-full rounded-4xl border-8 border-neutral-800 bg-amber-100 p-4">
      {@render children()}
    </div>
  </section>
</main>
