import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

type CartHeaderProps = {
  showBackButton: boolean;
  itemCount?: number;
  onClearCart?: () => void;
};

const CartHeader = ({
  showBackButton,
  itemCount = 0,
  onClearCart,
}: CartHeaderProps) => {
  return (
    <Animated.View
      className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100"
      entering={FadeInDown.duration(400).springify()}
    >
      {showBackButton ? (
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
      ) : (
        <View className="w-8" />
      )}

      <Text className="text-lg font-semibold flex-1 text-center">
        My Cart {itemCount > 0 ? `(${itemCount})` : ''}
      </Text>

      {itemCount > 0 ? (
        <TouchableOpacity className="ml-4" onPress={onClearCart}>
          <Text className="text-primary text-sm">Clear</Text>
        </TouchableOpacity>
      ) : (
        <View className="w-8" />
      )}
    </Animated.View>
  );
};

export default CartHeader;
