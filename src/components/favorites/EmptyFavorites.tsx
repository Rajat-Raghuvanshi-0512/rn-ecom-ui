import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const EmptyFavorites = () => {
  return (
    <Animated.View
      className="flex-1 justify-center items-center p-6"
      entering={FadeInDown.duration(600).springify()}
    >
      <Ionicons name="heart-outline" size={80} color="#ddd" />
      <Animated.Text
        className="text-xl font-semibold mt-6 mb-2"
        entering={FadeInDown.delay(200).duration(500)}
      >
        No favorites yet
      </Animated.Text>
      <Animated.Text
        className="text-gray-500 text-center mb-6"
        entering={FadeInDown.delay(300).duration(500)}
      >
        Items added to your favorites will appear here
      </Animated.Text>
      <AnimatedTouchable
        className="bg-primary px-6 py-3 rounded-full"
        onPress={() => router.push('/home')}
        entering={FadeInUp.delay(400).duration(500)}
      >
        <Text className="text-white font-semibold">Start Shopping</Text>
      </AnimatedTouchable>
    </Animated.View>
  );
};

export default EmptyFavorites;
