export interface Category {
  id: number;
  name: string;
  icon: any; // Using any for icon names to avoid type issues
  type?: 'material' | 'ionicons' | 'feather' | 'material-community';
}

export const categories: Category[] = [
  { id: 1, name: 'All', icon: 'grid' },
  { id: 2, name: 'Shoes', icon: 'shoe-sneaker', type: 'material-community' },
  { id: 3, name: "Men's", icon: 'shirt-outline', type: 'ionicons' },
  { id: 4, name: 'Watches', icon: 'watch', type: 'material' },
  { id: 5, name: 'Electronics', icon: 'headphones', type: 'feather' },
  { id: 6, name: 'Kitchen', icon: 'home', type: 'feather' },
  { id: 7, name: 'Personal Care', icon: 'smile', type: 'feather' },
];
