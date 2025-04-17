<script lang="ts">
  interface ChatFormProps {
    submit?: (event: SubmitEvent) => void;
    input?: string;
    disable?: boolean;
  }

  let { submit, input = $bindable(), disable }: ChatFormProps = $props();
</script>

<form onsubmit={submit} class="relative flex">
  <input
    bind:value={input}
    name="user-input"
    type="text"
    required
    disabled={disable}
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
