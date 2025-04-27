import React, { useEffect } from 'react';
import { Stack, useSegments, useRouter, SplashScreen } from 'expo-router';
import { useAuth, AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import LoadingScreen from '../components/LoadingScreen';
import '../global.css';

// Keep the splash screen visible until authentication check completes
SplashScreen.preventAutoHideAsync();

// This layout acts as middleware for auth protection and global navigation
const RootLayoutNav = () => {
  const { authState, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Effect to handle auth state changes and redirect accordingly
  useEffect(() => {
    if (isLoading) {
      return; // Do nothing while loading
    }

    // Hide splash screen once we've finished checking auth state
    SplashScreen.hideAsync();

    const inAuthGroup = segments[0] === '(auth)';
    const inOnboardingGroup = segments[0] === '(onboarding)';
    const inTabsGroup = segments[0] === '(tabs)';

    // Route protection logic
    if (authState.isLoggedIn) {
      // If the user is logged in but trying to access auth or onboarding, redirect to home
      if (inAuthGroup || inOnboardingGroup) {
        router.replace({ pathname: '/(tabs)/home' });
      }
    }
    // If the user is not logged in and trying to access protected pages, redirect to onboarding
    else if (inTabsGroup) {
      router.replace({ pathname: '/(onboarding)/welcome' });
    }
    // Initial redirect if not logged in and not on welcome or auth pages
    else if (segments[0] && !inAuthGroup && !inOnboardingGroup) {
      router.replace({ pathname: '/(onboarding)/welcome' });
    }
  }, [authState.isLoggedIn, segments, isLoading, router]);

  // Show loading while checking auth state
  if (isLoading) {
    return <LoadingScreen message="Setting things up..." />;
  }

  // Return a Stack for the entire app
  // This allows us to handle transitions between all screens
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      {/* Define all screens */}
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="index" />
      <Stack.Screen
        name="product/[id]"
        options={{ animation: 'slide_from_right' }}
      />
    </Stack>
  );
};

// Wrap the entire app with AuthProvider
export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <RootLayoutNav />
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}
