import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

type ProductInfoProps = {
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  sellerName: string;
  nameAnimatedStyle: any;
  priceAnimatedStyle: any;
};

const ProductInfo = ({
  name,
  price,
  rating,
  totalReviews,
  sellerName,
  nameAnimatedStyle,
  priceAnimatedStyle,
}: ProductInfoProps) => {
  return (
    <View className="px-4 pt-4">
      {/* Product Name */}
      <Animated.Text className="text-2xl font-bold" style={nameAnimatedStyle}>
        {name}
      </Animated.Text>

      {/* Seller Info */}
      <Text className="text-gray-500 mt-1">by {sellerName}</Text>

      {/* Price and Rating */}
      <View className="flex-row justify-between items-center mt-2">
        <Animated.Text
          className="text-primary text-2xl font-bold"
          style={priceAnimatedStyle}
        >
          ${price.toFixed(2)}
        </Animated.Text>

        <View className="flex-row items-center">
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text className="ml-1 font-medium">{rating.toFixed(1)}</Text>
          <Text className="text-gray-500 ml-1">({totalReviews} reviews)</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductInfo;
