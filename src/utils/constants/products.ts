export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  colors?: string[];
  favorite?: boolean;
  categoryId: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000',
    price: 70.0,
    colors: ['#E5E7EB', '#d4a373', '#457b9d', '#e76f51'],
    favorite: true,
    categoryId: 5, // Electronics
  },
  {
    id: 2,
    name: 'Smart Watch',
    image:
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000',
    price: 85.0,
    colors: ['#f72585', '#4cc9f0', '#4895ef', '#c77dff'],
    favorite: false,
    categoryId: 4, // Watches
  },
  {
    id: 3,
    name: 'Black T-Shirt',
    image:
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000',
    price: 25.0,
    favorite: true,
    categoryId: 3, // Men's
  },
  {
    id: 4,
    name: 'White Headphones',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
    price: 65.0,
    colors: ['#000000', '#ffffff'],
    favorite: false,
    categoryId: 5, // Electronics
  },
  {
    id: 5,
    name: 'Running Shoes',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000',
    price: 120.0,
    colors: ['#f8ad9d', '#ffd166', '#06d6a0', '#118ab2'],
    favorite: false,
    categoryId: 2, // Shoes
  },
  {
    id: 6,
    name: 'Elegant Watch',
    image:
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000',
    price: 199.0,
    colors: ['#8d99ae', '#edf2f4', '#2b2d42'],
    favorite: true,
    categoryId: 4, // Watches
  },
  {
    id: 7,
    name: 'Denim Jacket',
    image:
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000',
    price: 85.0,
    favorite: false,
    categoryId: 3, // Men's
  },
  {
    id: 8,
    name: 'Casual Sneakers',
    image:
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1000',
    price: 75.0,
    colors: ['#000000', '#ffffff', '#ff4d6d'],
    favorite: true,
    categoryId: 2, // Shoes
  },
  {
    id: 9,
    name: 'Coffee Maker',
    image:
      'https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=1000',
    price: 129.99,
    colors: ['#000000', '#787878', '#c0c0c0'],
    favorite: false,
    categoryId: 6, // Home & Kitchen
  },
  {
    id: 10,
    name: 'Air Fryer',
    image:
      'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?q=80&w=1000',
    price: 89.99,
    colors: ['#000000', '#ffffff'],
    favorite: false,
    categoryId: 6, // Home & Kitchen
  },
  {
    id: 11,
    name: 'Facial Serum',
    image:
      'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?q=80&w=1000',
    price: 35.99,
    colors: ['#f2a1a1', '#f5e3e0', '#6a8d73'],
    favorite: false,
    categoryId: 7, // Beauty & Personal Care
  },
  {
    id: 12,
    name: 'Electric Shaver',
    image:
      'https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=1000',
    price: 59.99,
    colors: ['#2d3142', '#4f5d75', '#d3d0cb'],
    favorite: false,
    categoryId: 7, // Beauty & Personal Care
  },
];
