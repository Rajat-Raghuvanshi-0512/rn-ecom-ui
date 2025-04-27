import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const EmptyCart = () => {
  return (
    <Animated.View
      className="flex-1 justify-center items-center p-6"
      entering={FadeInDown.duration(600).springify()}
    >
      <Ionicons name="cart-outline" size={80} color="#ddd" />
      <Text className="text-xl font-semibold mt-6 mb-2">
        Your cart is empty
      </Text>
      <Text className="text-gray-500 text-center mb-6">
        Looks like you haven't added any products to your cart yet.
      </Text>
      <AnimatedTouchable
        className="bg-primary px-6 py-3 rounded-full"
        onPress={() => router.push('/home')}
        entering={FadeInUp.delay(300).duration(500)}
      >
        <Text className="text-white font-semibold">Start Shopping</Text>
      </AnimatedTouchable>
    </Animated.View>
  );
};

export default EmptyCart;
