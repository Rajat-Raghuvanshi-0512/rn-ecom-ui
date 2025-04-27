import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1 items-center justify-center p-4">
        <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center mb-6">
          <Ionicons name="alert-circle-outline" size={40} color="#7F00FF" />
        </View>

        <Text className="text-2xl font-bold mb-2 text-center">
          Page Not Found
        </Text>
        <Text className="text-lg text-gray-600 mb-8 text-center">
          The page you're looking for doesn't exist or has been moved.
        </Text>

        <TouchableOpacity
          className="bg-primary py-3 px-6 rounded-xl"
          onPress={() => router.back()}
        >
          <Text className="text-white font-bold text-center">Go Back</Text>
        </TouchableOpacity>

        <Link href={{ pathname: '/' }} className="mt-4">
          <Text className="text-primary font-medium">Go to Home</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
