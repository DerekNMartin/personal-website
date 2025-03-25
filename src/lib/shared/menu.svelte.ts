import { page } from '$app/state';
import { goto } from '$app/navigation';

const menuItems = [
  { id: '/', title: 'Home' },
  { id: '/about', title: 'About' },
  { id: '/projects', title: 'Projects' }
];

const pageIndex = $derived(menuItems.findIndex((item) => item.id === page.route.id));
const currentPageItem = $derived(menuItems[pageIndex]);

export function useMenu() {
  function navigateToIndex(index: number) {
    const menuItem = menuItems[index];
    if (menuItem) goto(menuItem.id);
  }

  return {
    get pageIndex() {
      return pageIndex;
    },
    get currentPageItem() {
      return currentPageItem;
    },
    navigateToIndex,
    menuItems,
    total: menuItems.length
  };
}
