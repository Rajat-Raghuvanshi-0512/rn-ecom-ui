import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

export default function CartScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-2xl font-bold mb-6 text-center">Cart Screen</Text>
        <Text className="text-lg text-gray-600 mb-8 text-center">
          This is your shopping cart. Items you add to your cart will appear
          here.
        </Text>
      </View>
    </SafeAreaView>
  );
}
