let scrollElement: HTMLElement | undefined = $state();
let totalChunks: number = $state(10);
let currentChunk: number = $state(0);

export function useScroll() {
  function scroll() {
    if (!scrollElement) return;
    const scrollHeight = scrollElement?.getBoundingClientRect().height;
    const scrollAmount = scrollHeight / totalChunks;
    const scrollPosition = currentChunk * scrollAmount;
    const top =
      scrollPosition === 0 ? 0 : currentChunk === totalChunks - 1 ? scrollHeight : scrollPosition;
    scrollElement.scroll({ top, behavior: 'smooth' });
  }

  $effect(() => {
    scroll();
  });

  return {
    get currentChunk() {
      return currentChunk;
    },
    set currentChunk(value: number) {
      currentChunk = value;
    },
    get element() {
      return scrollElement;
    },
    set element(element: HTMLElement | undefined) {
      scrollElement = element;
    },
    get totalChunks() {
      return totalChunks;
    },
    set totalChunks(value: number) {
      totalChunks = value;
    }
  };
}
