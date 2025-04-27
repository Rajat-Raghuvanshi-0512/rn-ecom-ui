import React from 'react';
import { Stack } from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="test" options={{ title: 'Test' }} />
    </Stack>
  );
};

export default HomeLayout;
