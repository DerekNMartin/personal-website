const selectedIndex = $state({ value: 0 });
const menuItems = [{ label: 'Home' }, { label: 'About' }, { label: 'Projects' }];

export function useMenu() {
  return { selectedIndex, menuItems, total: menuItems.length };
}
