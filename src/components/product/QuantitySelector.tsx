import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

type QuantitySelectorProps = {
  quantity: number;
  onQuantityChange: (change: number) => void;
  quantityContainerStyle: any;
};

const QuantitySelector = ({
  quantity,
  onQuantityChange,
  quantityContainerStyle,
}: QuantitySelectorProps) => {
  return (
    <Animated.View className="mt-6 px-4" style={quantityContainerStyle}>
      <Text className="text-base font-medium mb-2">Quantity</Text>
      <View className="flex-row items-center">
        <TouchableOpacity
          className="bg-gray-100 w-8 h-8 rounded-full items-center justify-center"
          onPress={() => onQuantityChange(-1)}
          disabled={quantity <= 1}
        >
          <Feather
            name="minus"
            size={16}
            color={quantity <= 1 ? '#ccc' : '#333'}
          />
        </TouchableOpacity>
        <Text className="mx-4 text-base font-medium">{quantity}</Text>
        <TouchableOpacity
          className="bg-gray-100 w-8 h-8 rounded-full items-center justify-center"
          onPress={() => onQuantityChange(1)}
        >
          <Feather name="plus" size={16} color="#333" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default QuantitySelector;
