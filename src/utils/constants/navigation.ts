export interface TabItem {
  key: string;
  icon: string;
  label: string;
}

export const tabs: TabItem[] = [
  { key: 'home', icon: 'home', label: 'Home' },
  { key: 'cart', icon: 'shopping-cart', label: 'Cart' },
  { key: 'favorites', icon: 'heart', label: 'Favorites' },
  { key: 'profile', icon: 'user', label: 'Profile' },
];
