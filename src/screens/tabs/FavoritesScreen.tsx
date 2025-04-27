import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useFavorites } from '../../context/FavoritesContext';
import { productDetails } from '../../utils/constants/productDetails';
import { useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

// Import components
import EmptyFavorites from '../../components/favorites/EmptyFavorites';
import FavoriteItem from '../../components/favorites/FavoriteItem';
import FavoritesHeader from '../../components/favorites/FavoritesHeader';

const FavoritesScreen = () => {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();

  // Get favorite items with product details
  const favoriteItems = favorites.map((id) => productDetails[id]);

  // Animation for the header title
  const headerOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
  }, []);

  const headerAnimatedStyle = {
    opacity: headerOpacity.value,
    transform: [
      { translateY: withTiming(headerOpacity.value * 0, { duration: 500 }) },
    ],
  };

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

  // Handle clearing all favorites
  const handleClearAll = () => {
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
  };

  // Handle empty favorites
  if (favoriteItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" />
        <FavoritesHeader
          isEmpty={true}
          onClearAll={handleClearAll}
          headerAnimatedStyle={headerAnimatedStyle}
        />
        <EmptyFavorites />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Header */}
      <FavoritesHeader isEmpty={false} onClearAll={handleClearAll} />

      {/* Favorite Items */}
      <ScrollView className="flex-1">
        {favoriteItems.map((item, index) => (
          <FavoriteItem
            key={item.id}
            item={item}
            index={index}
            onRemove={handleRemoveFromFavorites}
            onPress={handleNavigateToProduct}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavoritesScreen;
