import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Category, Product, products } from '../../utils/constants';
import { useFavorites } from '../../context/FavoritesContext';

type ProductCardProps = {
  product: Product;
  index: number;
  onPress: (product: Product) => void;
};

const ProductCard = ({ product, index, onPress }: ProductCardProps) => {
  const scale = useSharedValue(1);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isProductFavorite = isFavorite(product.id);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleToggleFavorite = (e: GestureResponderEvent) => {
    e.stopPropagation(); // Prevent triggering parent onPress
    if (isProductFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  return (
    <Animated.View
      className="flex-1 rounded-xl bg-gray-100 overflow-hidden"
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
            <View className="h-40 justify-center items-center">
              <Image
                source={{ uri: product.image }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>
            <TouchableOpacity
              className="absolute top-2 right-2 bg-white rounded-full w-7 h-7 items-center justify-center shadow-sm"
              onPress={handleToggleFavorite}
            >
              <Feather
                name="heart"
                size={16}
                color={isProductFavorite ? '#7F00FF' : '#999'}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View className="m-3 gap-y-1">
          <Text className="text-gray-800 font-medium" numberOfLines={1}>
            {product.name}
          </Text>
          <View className="flex-row justify-between flex-wrap items-center gap-x-1">
            <Text className="text-primary font-bold mt-1">
              ${product.price.toFixed(2)}
            </Text>

            {product.colors && (
              <View className="flex-row mt-2">
                {product.colors.map((color: string, idx: number) => (
                  <View
                    key={idx}
                    className="w-4 h-4 rounded-full mr-1.5"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </View>
            )}
          </View>
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
      ? products
      : products.filter(
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
        <FlatList
          data={filteredProducts}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 20 }}
          columnWrapperStyle={{ justifyContent: 'center', gap: 20 }}
          renderItem={({ item, index }) => (
            <ProductCard
              key={item.id}
              product={item}
              index={index}
              onPress={handleProductPress}
            />
          )}
        />
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
