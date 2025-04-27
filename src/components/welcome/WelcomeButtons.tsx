import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { useAuth } from '../../context/AuthContext';

interface WelcomeButtonsProps {
  opacityValue: any; // SharedValue<number>
}

const WelcomeButtons: React.FC<WelcomeButtonsProps> = ({ opacityValue }) => {
  const [activeTab, setActiveTab] = useState<'register' | 'signin'>('register');
  const { width } = Dimensions.get('window');
  const buttonWidth = (width - 48) / 2; // 48 = padding of 24 on each side
  const { authState } = useAuth();

  // If already logged in, navigate to home
  useEffect(() => {
    if (authState.isLoggedIn) {
      router.replace({ pathname: '/(tabs)/home' });
    }
  }, [authState.isLoggedIn]);

  // Animation value for the sliding background
  const slidePosition = useSharedValue(0);

  useEffect(() => {
    // Update sliding background position when active tab changes
    slidePosition.value = withTiming(activeTab === 'register' ? 0 : 1, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [activeTab]);

  // Create animated style for sliding background
  const slidingBackgroundStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      slidePosition.value,
      [0, 1],
      [0, buttonWidth]
    );

    return {
      transform: [{ translateX }],
    };
  });

  const buttonContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityValue.value,
    };
  });

  const register = () => {
    setActiveTab('register');
    router.push('/register');
  };

  const signin = () => {
    setActiveTab('signin');
    router.push('/login');
  };

  return (
    <Animated.View style={buttonContainerStyle} className="w-full mb-10 px-6">
      {/* Container with a rounded background */}
      <View className="flex-row h-[60px] bg-transparent rounded-[999px] overflow-hidden relative border-primary border-[3px]">
        {/* Sliding background */}
        <Animated.View
          style={slidingBackgroundStyle}
          className="absolute top-0 bottom-0 w-1/2 bg-primary rounded-[999px]"
        />

        {/* Register button */}
        <Pressable
          className="flex-1 items-center justify-center z-10"
          onPress={() => register()}
        >
          <Text
            className={`text-base font-semibold ${
              activeTab === 'register' ? 'text-white' : 'text-primary'
            }`}
          >
            Register
          </Text>
        </Pressable>

        {/* Sign in button */}
        <Pressable
          className="flex-1 items-center justify-center z-10"
          onPress={() => signin()}
        >
          <Text
            className={`text-base font-semibold ${
              activeTab === 'signin' ? 'text-white' : 'text-primary'
            }`}
          >
            Sign in
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default WelcomeButtons;
