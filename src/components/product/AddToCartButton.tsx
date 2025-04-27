import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { SlideInDown } from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type AddToCartButtonProps = {
  onPress: () => void;
  buttonAnimatedStyle: any;
  quantity: number;
  onQuantityChange: (change: number) => void;
};

const AddToCartButton = ({
  onPress,
  buttonAnimatedStyle,
  quantity,
  onQuantityChange,
}: AddToCartButtonProps) => {
  return (
    <Animated.View
      className="flex-row items-center justify-between gap-2 py-3 px-4 rounded-full bg-violet-200 absolute bottom-10 w-[90%] left-1/2 -translate-x-[50%] shadow-hard-3"
      entering={SlideInDown.duration(600).delay(300)}
    >
      <View className="flex-row items-center rounded-full bg-white p-2">
        <TouchableOpacity
          className="w-8 h-8 rounded items-center justify-center"
          onPress={() => onQuantityChange(-1)}
        >
          <Feather name="minus" size={18} color="#000" />
        </TouchableOpacity>

        <Text className="mx-3 text-lg font-bold">{quantity}</Text>

        <TouchableOpacity
          className="w-8 h-8 rounded items-center justify-center"
          onPress={() => onQuantityChange(1)}
        >
          <Feather name="plus" size={18} color="#000" />
        </TouchableOpacity>
      </View>

      <View>
        <AnimatedTouchable
          className="bg-primary px-10 py-4 rounded-full"
          onPress={onPress}
          style={buttonAnimatedStyle}
        >
          <Text className="text-white font-bold text-xl">Add to Cart</Text>
        </AnimatedTouchable>
      </View>
    </Animated.View>
  );
};

export default AddToCartButton;
