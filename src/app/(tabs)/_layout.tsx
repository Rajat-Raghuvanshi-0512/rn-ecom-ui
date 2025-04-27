import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Platform, View, Text } from 'react-native';

export default function TabLayout() {
  const { authState } = useAuth();
  const { getCartItemCount } = useCart();
  const { favorites } = useFavorites();
  const cartItemCount = getCartItemCount();
  const favoritesCount = favorites.length;

  // If user is not authenticated, don't render tabs and redirect
  if (!authState.isLoggedIn) {
    // We handle redirects in the root layout
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#7F00FF',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 1,
          borderTopColor: '#f1f1f1',
          height: Platform.OS === 'ios' ? 80 : 60,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="cart-outline" size={size} color={color} />
              {cartItemCount > 0 && (
                <View className="absolute -top-2 -right-2 bg-primary rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                  <Text className="text-white text-xs font-bold">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="heart-outline" size={size} color={color} />
              {favoritesCount > 0 && (
                <View className="absolute -top-2 -right-2 bg-primary rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                  <Text className="text-white text-xs font-bold">
                    {favoritesCount > 99 ? '99+' : favoritesCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
