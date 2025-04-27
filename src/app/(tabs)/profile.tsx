import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const { authState, logout } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1 items-center justify-center p-4">
        <View className="w-24 h-24 rounded-full bg-primary/10 items-center justify-center mb-6">
          <Text className="text-primary text-3xl font-bold">
            {authState.userInfo?.email?.charAt(0).toUpperCase() ?? 'U'}
          </Text>
        </View>

        <Text className="text-2xl font-bold mb-2 text-center">Profile</Text>
        <Text className="text-lg text-gray-600 mb-8 text-center">
          {authState.userInfo?.email ?? 'User'}
        </Text>

        <TouchableOpacity
          className="bg-primary py-3 px-6 rounded-xl w-full"
          onPress={logout}
        >
          <Text className="text-white font-bold text-center">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
