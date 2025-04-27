export interface ProductDetail {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  sellerName: string;
  rating: number;
  totalReviews: number;
  description: string;
  images: string[];
  specifications: { label: string; value: string }[];
  favorite?: boolean;
  category?: string;
}

export const productDetails: Record<number, ProductDetail> = {
  1: {
    id: 1,
    name: 'Wireless Headphones',
    price: 70.0,
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000',
    colors: ['#1E1E1E', '#FF6B6B', '#FFA41B', '#00A8E8', '#777777'],
    sellerName: 'Syed Noman',
    rating: 4.8,
    totalReviews: 320,
    favorite: false,
    category: 'Electronics',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000',
      'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=1000',
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000',
      'https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=1000',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000',
    ],
    specifications: [
      { label: 'Brand', value: 'Sony' },
      { label: 'Model', value: 'WH-1000XM4' },
      { label: 'Color', value: 'Silver' },
      { label: 'Connectivity', value: 'Bluetooth 5.0' },
      { label: 'Battery Life', value: 'Up to 30 hours' },
    ],
  },
  2: {
    id: 2,
    name: 'Smart Watch',
    price: 85.0,
    image:
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000',
    colors: ['#f72585', '#4cc9f0', '#4895ef', '#c77dff'],
    sellerName: 'Tech Gadgets Inc.',
    rating: 4.5,
    totalReviews: 185,
    favorite: false,
    category: 'Electronics',
    description:
      "The ultimate smart companion for your active lifestyle. This smartwatch features health monitoring, GPS tracking, and a vibrant touchscreen display. Stay connected and track your fitness goals with this sleek, water-resistant device that seamlessly integrates with your smartphone. With up to 7 days of battery life, it's perfect for everyday use and outdoor adventures.",
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000',
      'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?q=80&w=1000',
    ],
    specifications: [
      { label: 'Brand', value: 'FitTech' },
      { label: 'Model', value: 'FT-200' },
      { label: 'Display', value: '1.4" AMOLED' },
      { label: 'Water Resistance', value: '5 ATM' },
      { label: 'Battery Life', value: 'Up to 7 days' },
      { label: 'Connectivity', value: 'Bluetooth 5.0, WiFi' },
    ],
  },
  3: {
    id: 3,
    name: 'Black T-Shirt',
    price: 25.0,
    image:
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000',
    colors: ['#000000', '#333333', '#555555', '#777777'],
    sellerName: 'Urban Styles',
    rating: 4.2,
    totalReviews: 143,
    favorite: false,
    category: 'Fashion',
    description:
      'Classic black t-shirt made from premium 100% cotton for ultimate comfort and durability. The versatile design features a relaxed fit and ribbed crew neck that maintains its shape wash after wash. Perfect for everyday wear, this t-shirt can be dressed up or down for any occasion. The breathable fabric ensures all-day comfort in any season.',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000',
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000',
    ],
    specifications: [
      { label: 'Brand', value: 'Urban Classics' },
      { label: 'Material', value: '100% Cotton' },
      { label: 'Fit', value: 'Regular' },
      { label: 'Neck Style', value: 'Crew Neck' },
      { label: 'Care', value: 'Machine Washable' },
    ],
  },
  4: {
    id: 4,
    name: 'White Headphones',
    price: 65.0,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
    colors: ['#ffffff', '#000000'],
    sellerName: 'AudioTech',
    rating: 4.3,
    totalReviews: 97,
    favorite: false,
    category: 'Electronics',
    description:
      'Experience crystal-clear sound with these minimalist white headphones. Featuring advanced noise cancellation technology, these headphones deliver immersive audio while blocking out unwanted background noise. The lightweight design with cushioned ear cups ensures comfort during extended listening sessions. With Bluetooth 5.0 connectivity and 20-hour battery life, enjoy your favorite music wirelessly all day long.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=1000',
      'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=1000',
    ],
    specifications: [
      { label: 'Brand', value: 'AudioTech' },
      { label: 'Model', value: 'SoundPulse X2' },
      { label: 'Connectivity', value: 'Bluetooth 5.0' },
      { label: 'Battery Life', value: '20 hours' },
      { label: 'Noise Cancellation', value: 'Active' },
    ],
  },
  5: {
    id: 5,
    name: 'Running Shoes',
    price: 120.0,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000',
    colors: ['#f8ad9d', '#ffd166', '#06d6a0', '#118ab2'],
    sellerName: 'SportStride',
    rating: 4.7,
    totalReviews: 289,
    favorite: false,
    category: 'Fashion',
    description:
      "Elevate your running experience with these high-performance shoes designed for maximum comfort and durability. The breathable mesh upper keeps your feet cool while the responsive cushioning absorbs impact for a smoother stride. The specialized traction pattern provides excellent grip on various surfaces, while the lightweight design reduces fatigue during long-distance runs. Whether you're a casual jogger or training for a marathon, these shoes deliver the perfect balance of support and flexibility.",
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000',
    ],
    specifications: [
      { label: 'Brand', value: 'SportStride' },
      { label: 'Model', value: 'CloudRunner Pro' },
      { label: 'Type', value: 'Running' },
      { label: 'Weight', value: '8.5 oz' },
      { label: 'Drop', value: '8mm' },
      { label: 'Arch Support', value: 'Neutral' },
    ],
  },
  6: {
    id: 6,
    name: 'Elegant Watch',
    price: 199.0,
    image:
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000',
    colors: ['#8d99ae', '#edf2f4', '#2b2d42'],
    sellerName: 'Chronos Timepieces',
    rating: 4.9,
    totalReviews: 216,
    favorite: false,
    category: 'Fashion',
    description:
      'This elegant timepiece combines classic design with modern precision. The scratch-resistant sapphire crystal protects the meticulously crafted dial, while the genuine leather strap provides comfort and sophistication. Water-resistant to 50 meters, this versatile watch transitions seamlessly from business meetings to evening events. The automatic movement with 48-hour power reserve ensures reliable timekeeping without the need for batteries. A true statement piece that will elevate any outfit and stand the test of time.',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1000',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1000',
    ],
    specifications: [
      { label: 'Brand', value: 'Chronos' },
      { label: 'Model', value: 'Heritage Collection' },
      { label: 'Movement', value: 'Automatic' },
      { label: 'Case Material', value: 'Stainless Steel' },
      { label: 'Strap', value: 'Genuine Leather' },
      { label: 'Water Resistance', value: '50m' },
    ],
  },
  7: {
    id: 7,
    name: 'Denim Jacket',
    price: 85.0,
    image:
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000',
    colors: ['#3a506b', '#1c2541', '#0b132b'],
    sellerName: 'Urban Outfitters',
    rating: 4.4,
    totalReviews: 158,
    favorite: false,
    category: 'Fashion',
    description:
      'This timeless denim jacket offers the perfect combination of style and versatility. Crafted from premium denim fabric, the jacket features a comfortable fit and classic button-front design. The distressed details and vintage wash give it an authentic, lived-in look that pairs effortlessly with any outfit. Multiple pockets provide practical storage, while the durable construction ensures this jacket will be a staple in your wardrobe for years to come. Layer it over a t-shirt in spring or under a coat in winter for year-round style.',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000',
      'https://images.unsplash.com/photo-1604644401890-0bd678c83788?q=80&w=1000',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000',
      'https://images.unsplash.com/photo-1600574691453-499962cc0611?q=80&w=1000',
    ],
    specifications: [
      { label: 'Brand', value: 'Urban Classic' },
      { label: 'Material', value: '100% Cotton Denim' },
      { label: 'Fit', value: 'Regular' },
      { label: 'Closure', value: 'Button Front' },
      { label: 'Care', value: 'Machine Wash Cold' },
      { label: 'Style', value: 'Vintage Wash' },
    ],
  },
  8: {
    id: 8,
    name: 'Casual Sneakers',
    price: 75.0,
    image:
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1000',
    colors: ['#000000', '#ffffff', '#ff4d6d'],
    favorite: true,
    sellerName: 'StreetStyle Co.',
    rating: 4.6,
    totalReviews: 203,
    category: 'Fashion',
    description:
      "Step into comfort and style with these versatile casual sneakers. The sleek, minimalist design makes them easy to pair with jeans, shorts, or even casual suits. The cushioned insole provides all-day comfort, while the durable rubber outsole offers excellent traction on various surfaces. Crafted from premium materials with attention to detail, these sneakers combine fashion and functionality in a timeless package. Whether you're running errands or meeting friends for coffee, these sneakers deliver the perfect blend of casual coolness and practical comfort.",
    images: [
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1000',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000',
    ],
    specifications: [
      { label: 'Brand', value: 'StreetStyle' },
      { label: 'Model', value: 'Urban Classic' },
      { label: 'Upper Material', value: 'Premium Leather' },
      { label: 'Sole', value: 'Rubber' },
      { label: 'Closure', value: 'Lace-up' },
      { label: 'Style', value: 'Casual' },
    ],
  },
  9: {
    id: 9,
    name: 'Coffee Maker',
    price: 129.99,
    image:
      'https://images.unsplash.com/photo-1520575839349-6d32bec89c74?q=80&w=1000',
    colors: ['#000000', '#787878', '#c0c0c0'],
    sellerName: 'HomeEssentials',
    rating: 4.7,
    totalReviews: 237,
    favorite: false,
    category: 'Home & Kitchen',
    description:
      'Transform your morning routine with this premium programmable coffee maker. Featuring an intuitive digital display and customizable brewing options, you can enjoy your coffee exactly how you like it. The thermal carafe keeps your coffee hot for hours without burning, while the advanced water filtration system ensures pure flavor every time. With its sleek design and durable construction, this coffee maker is the perfect addition to any kitchen counter.',
    images: [
      'https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=1000',
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1000',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000',
    ],
    specifications: [
      { label: 'Brand', value: 'BrewMaster' },
      { label: 'Model', value: 'Pro 5000' },
      { label: 'Capacity', value: '12 Cups' },
      { label: 'Programmable', value: 'Yes' },
      { label: 'Auto Shut-off', value: 'Yes' },
      { label: 'Warranty', value: '2 Years' },
    ],
  },
  10: {
    id: 10,
    name: 'Air Fryer',
    price: 89.99,
    image:
      'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?q=80&w=1000',
    colors: ['#000000', '#ffffff'],
    sellerName: 'KitchenPlus',
    rating: 4.8,
    totalReviews: 345,
    favorite: false,
    category: 'Home & Kitchen',
    description:
      'Enjoy healthier, crispy meals in minutes with this versatile air fryer. Using rapid air technology, it cooks food with up to 85% less oil than traditional frying methods without sacrificing taste or texture. The spacious 5.8-quart basket accommodates family-sized portions, while the intuitive digital touchscreen offers 8 preset cooking programs for effortless meal preparation. Easy to clean and compact enough for any kitchen, this air fryer revolutionizes everyday cooking with speed and convenience.',
    images: [
      'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?q=80&w=1000',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1000',
    ],
    specifications: [
      { label: 'Brand', value: 'CrispTech' },
      { label: 'Model', value: 'AirPro XL' },
      { label: 'Capacity', value: '5.8 Qt' },
      { label: 'Power', value: '1700W' },
      { label: 'Temperature Range', value: '180°F-400°F' },
      { label: 'Preset Programs', value: '8' },
    ],
  },
  11: {
    id: 11,
    name: 'Facial Serum',
    price: 35.99,
    image:
      'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?q=80&w=1000',
    colors: ['#f2a1a1', '#f5e3e0', '#6a8d73'],
    sellerName: 'GlowEssentials',
    rating: 4.9,
    totalReviews: 189,
    favorite: false,
    category: 'Beauty & Personal Care',
    description:
      'Revitalize your skin with this advanced facial serum formulated with hyaluronic acid, vitamin C, and botanical extracts. This lightweight, fast-absorbing serum delivers deep hydration while diminishing the appearance of fine lines and dark spots. The powerful antioxidants protect against environmental stressors and support natural collagen production for firmer, more radiant skin. Suitable for all skin types and free from parabens, sulfates, and artificial fragrances, this serum is your daily essential for a healthy, glowing complexion.',
    images: [
      'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?q=80&w=1000',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000',
      'https://images.unsplash.com/photo-1596451190630-186aff535bf2?q=80&w=1000',
    ],
    specifications: [
      { label: 'Brand', value: 'NaturalGlow' },
      { label: 'Size', value: '30ml' },
      { label: 'Skin Type', value: 'All Types' },
      { label: 'Key Ingredients', value: 'Hyaluronic Acid, Vitamin C' },
      { label: 'Cruelty-Free', value: 'Yes' },
      { label: 'Paraben-Free', value: 'Yes' },
    ],
  },
  12: {
    id: 12,
    name: 'Electric Shaver',
    price: 59.99,
    image:
      'https://images.unsplash.com/photo-1585760656961-1a2d3efc320c?q=80&w=1000',
    colors: ['#2d3142', '#4f5d75', '#d3d0cb'],
    sellerName: 'GroomTech',
    rating: 4.6,
    totalReviews: 278,
    favorite: false,
    category: 'Beauty & Personal Care',
    description:
      'Achieve a smooth, precise shave with this advanced electric shaver featuring triple-blade technology and a flexible head that contours to your face. The powerful yet quiet motor delivers 14,000 cuts per minute for efficient, irritation-free results. Fully waterproof for wet or dry use, this shaver can be used with gel, foam, or in the shower. The rechargeable battery provides up to 60 minutes of cordless operation, while the LED display shows battery status and cleaning reminders. Complete with a travel case and precision trimmer attachment, this shaver is the ultimate grooming solution for the modern man.',
    images: [
      'https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=1000',
      'https://images.unsplash.com/photo-1611967164521-abae8fba4668?q=80&w=1000',
    ],
    specifications: [
      { label: 'Brand', value: 'PrecisionShave' },
      { label: 'Model', value: 'ProGlide X3' },
      { label: 'Waterproof', value: 'Yes' },
      { label: 'Battery Life', value: '60 minutes' },
      { label: 'Charging Time', value: '1 hour' },
      { label: 'Warranty', value: '2 Years' },
    ],
  },
};
