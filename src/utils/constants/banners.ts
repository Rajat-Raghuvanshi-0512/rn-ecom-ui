export interface PromoBannerItem {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
  bgColor: string;
}

export const banners: PromoBannerItem[] = [
  {
    id: 1,
    title: 'Super Sale Discount',
    subtitle: 'Up to 50%',
    buttonText: 'Shop Now',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000',
    bgColor: '#f3f4f6', // light gray
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Summer Collection',
    buttonText: 'Explore',
    image:
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000',
    bgColor: '#ede9fe', // light purple
  },
  {
    id: 3,
    title: 'Limited Edition',
    subtitle: 'Premium Items',
    buttonText: 'View All',
    image:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000',
    bgColor: '#e6f7ff', // light blue
  },
];
