import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';

// Import components
import {
  Illustration,
  WelcomeText,
  WelcomeButtons,
} from '../components/welcome';

const Welcome: React.FC = () => {
  // Animation values
  const opacityMain = useSharedValue(0);
  const opacityButtons = useSharedValue(0);
  const translateY = useSharedValue(20);
  const router = useRouter();
  const { authState } = useAuth();

  // Check authentication status and redirect if already logged in
  useEffect(() => {
    if (authState.isLoggedIn) {
      router.replace({ pathname: '/(tabs)/home' });
    }
  }, [authState.isLoggedIn]);

  useEffect(() => {
    opacityButtons.value = withDelay(900, withSpring(1, { damping: 20 }));
    opacityMain.value = withDelay(150, withSpring(1, { damping: 20 }));
  }, []);

  // Create animated styles
  const mainContentStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityMain.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <ScrollView
      contentContainerClassName="flex-1"
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={['#7F00FF25', '#7F00FF10', '#7F00FF25']}
        className="flex-1"
      >
        <StatusBar style="dark" />

        <View className="w-full h-full items-center justify-center">
          <Animated.View
            style={mainContentStyle}
            className="items-center w-full gap-20"
          >
            <Illustration />
          </Animated.View>

          <WelcomeText />

          <WelcomeButtons opacityValue={opacityButtons} />
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default Welcome;
