import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { router } from 'expo-router';

type CartItemProps = {
  item: {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    color?: string;
    size?: string;
  };
  index: number;
  onUpdateQuantity: (id: number, change: number) => void;
  onRemove: (id: number) => void;
  onSaveForLater: (id: number) => void;
};

const CartItem = ({
  item,
  index,
  onUpdateQuantity,
  onRemove,
  onSaveForLater,
}: CartItemProps) => {
  // Navigate to product details when cart item is clicked
  const handleProductPress = () => {
    router.push(`/product/${item.id}`);
  };

  return (
    <Animated.View
      className="flex-row p-4 border-b border-gray-100"
      entering={FadeInRight.delay(index * 100 + 200).duration(400)}
    >
      {/* Product Image and Details - Clickable to open product details */}
      <TouchableOpacity
        className="flex-row flex-1"
        onPress={handleProductPress}
        activeOpacity={0.7}
      >
        {/* Product Image */}
        <Image
          source={{ uri: item.image }}
          className="w-20 h-20 rounded-xl"
          resizeMode="cover"
        />

        {/* Product Details */}
        <View className="flex-1 ml-4 justify-between">
          <View>
            <Text className="text-base font-medium">{item.title}</Text>
            <View className="flex-row mt-1">
              {item.color && (
                <Text className="text-xs text-gray-500 mr-2">
                  Color: {item.color}
                </Text>
              )}
              {item.size && (
                <Text className="text-xs text-gray-500">Size: {item.size}</Text>
              )}
            </View>
            <Text className="text-primary font-medium mt-1">
              ${item.price.toFixed(2)}
            </Text>
          </View>

          {/* Actions Row */}
          <View className="flex-row justify-between items-center mt-2">
            {/* Quantity Controls */}
            <View className="flex-row items-center bg-gray-100 rounded-full">
              <TouchableOpacity
                className="p-1"
                onPress={() => {
                  if (item.quantity > 1) {
                    onUpdateQuantity(item.id, -1);
                  } else {
                    Alert.alert(
                      'Remove Item',
                      'Do you want to remove this item from your cart?',
                      [
                        { text: 'Cancel', style: 'cancel' },
                        {
                          text: 'Remove',
                          onPress: () => onRemove(item.id),
                          style: 'destructive',
                        },
                      ]
                    );
                  }
                }}
              >
                <Ionicons
                  name="remove-circle"
                  size={22}
                  color={item.quantity > 1 ? '#000' : '#f87171'}
                />
              </TouchableOpacity>
              <Text className="px-2 font-medium min-w-[20px] text-center">
                {item.quantity}
              </Text>
              <TouchableOpacity
                className="p-1"
                onPress={() => onUpdateQuantity(item.id, 1)}
              >
                <Ionicons name="add-circle" size={22} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Item Actions */}
            <View className="flex-row">
              <TouchableOpacity
                className="mr-3"
                onPress={() => onSaveForLater(item.id)}
              >
                <Ionicons name="heart-outline" size={22} color="#6b7280" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onRemove(item.id)}>
                <Ionicons name="trash-outline" size={22} color="#f87171" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CartItem;
