import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Category } from './CategoryIcons';

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  colors?: string[];
  favorite?: boolean;
  categoryId: number;
}

export const allProducts: Product[] = [
  // All Products
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
];

type ProductCardProps = {
  product: Product;
  index: number;
  onPress: (product: Product) => void;
};

const ProductCard = ({ product, index, onPress }: ProductCardProps) => {
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View
      className="w-36 mb-6 mr-4"
      entering={FadeInUp.duration(400).delay(index * 100 + 200)}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPress(product)}
        onPressIn={() => {
          scale.value = withSpring(0.95);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
      >
        <Animated.View style={animatedStyles}>
          <View className="relative">
            <View className="rounded-xl bg-gray-100 h-36 w-36 justify-center items-center">
              <Image
                source={{ uri: product.image }}
                style={{ width: 80, height: 80 }}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity
              className="absolute top-2 right-2 bg-white rounded-full w-7 h-7 items-center justify-center shadow-sm"
              onPress={(e) => {
                e.stopPropagation(); // Prevent triggering parent onPress
                // Handle favorite toggle logic here
              }}
            >
              <Feather
                name="heart"
                size={16}
                color={product.favorite ? '#FF4747' : '#999'}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View className="mt-2">
          <Text className="text-gray-800 font-medium" numberOfLines={1}>
            {product.name}
          </Text>
          <Text className="text-primary font-bold mt-1">
            ${product.price.toFixed(2)}
          </Text>

          {product.colors && (
            <View className="flex-row mt-2">
              {product.colors.map((color, idx) => (
                <View
                  key={idx}
                  className="w-3 h-3 rounded-full mr-1"
                  style={{ backgroundColor: color }}
                />
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

type ProductSectionProps = {
  title: string;
  selectedCategory: Category;
};

const ProductSection = ({ title, selectedCategory }: ProductSectionProps) => {
  const router = useRouter();

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory.name === 'All'
      ? allProducts
      : allProducts.filter(
          (product) => product.categoryId === selectedCategory.id
        );

  const handleProductPress = (product: Product) => {
    router.push({
      pathname: '/product/[id]',
      params: { id: product.id.toString() },
    });
  };

  return (
    <View className="mt-4 mb-2">
      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="text-lg font-bold">{title}</Text>
        <TouchableOpacity>
          <Text className="text-primary text-sm font-medium">See all</Text>
        </TouchableOpacity>
      </View>

      {filteredProducts.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16 }}
        >
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onPress={handleProductPress}
            />
          ))}
        </ScrollView>
      ) : (
        <View className="py-8 items-center">
          <Text className="text-gray-500">
            No products found in this category
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProductSection;
