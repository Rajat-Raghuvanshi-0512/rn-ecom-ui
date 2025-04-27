import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useFavorites } from '../../context/FavoritesContext';
import { productDetails } from '../../utils/constants/productDetails';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutRight,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function FavoritesScreen() {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();

  // Get favorite items with product details
  const favoriteItems = favorites.map((id) => productDetails[id]);

  // Animation for the header title
  const headerOpacity = useSharedValue(0);
  React.useEffect(() => {
    headerOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [
      { translateY: withTiming(headerOpacity.value * 0, { duration: 500 }) },
    ],
  }));

  // Handle removing from favorites
  const handleRemoveFromFavorites = (id: number) => {
    Alert.alert(
      'Remove from Favorites',
      'Are you sure you want to remove this item from your favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: () => removeFromFavorites(id),
          style: 'destructive',
        },
      ]
    );
  };

  // Handle navigation to product details
  const handleNavigateToProduct = (id: number) => {
    router.push({
      pathname: '/product/[id]',
      params: { id: id.toString() },
    });
  };

  // Handle empty favorites
  if (favoriteItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" />

        {/* Header */}
        <Animated.View
          style={headerAnimatedStyle}
          className="px-4 py-3 border-b border-gray-100"
        >
          <Text className="text-xl font-semibold text-center">Favourites</Text>
        </Animated.View>

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
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Header */}
      <Animated.View
        className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100"
        entering={FadeInDown.duration(400)}
        layout={LinearTransition.springify()}
      >
        <View className="w-8" />
        <Text className="text-xl font-semibold">Favourites</Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Clear Favorites',
              'Are you sure you want to clear all favorites?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Clear',
                  onPress: () => clearFavorites(),
                  style: 'destructive',
                },
              ]
            );
          }}
        >
          <Text className="text-primary font-medium">Clear</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Favorite Items */}
      <ScrollView className="flex-1">
        {favoriteItems.map((item, index) => (
          <AnimatedTouchable
            key={item.id}
            className="flex-row bg-gray-50 mx-4 my-2 p-3 rounded-xl"
            onPress={() => handleNavigateToProduct(item.id)}
            activeOpacity={0.7}
            entering={FadeInDown.delay(index * 100).duration(400)}
            exiting={FadeOutRight.duration(300)}
            layout={LinearTransition.springify()}
          >
            {/* Product Image */}
            <Image
              source={{ uri: item.image }}
              className="w-20 h-20 rounded-lg bg-gray-200"
            />

            {/* Product Info */}
            <View className="flex-1 ml-3 justify-between">
              <View>
                <Text className="font-semibold text-base">{item.name}</Text>
                <Text className="text-gray-400 text-sm">{item.sellerName}</Text>
              </View>
              <Text className="font-semibold">${item.price.toFixed(2)}</Text>
            </View>

            {/* Remove button */}
            <AnimatedTouchable
              className="self-center"
              onPress={(e) => {
                e.stopPropagation();
                handleRemoveFromFavorites(item.id);
              }}
              entering={FadeInDown.delay(index * 100 + 200)}
            >
              <Ionicons name="bookmark" size={18} color="#7F00FF" />
            </AnimatedTouchable>
          </AnimatedTouchable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
