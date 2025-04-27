import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  withDelay,
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const WelcomeText: React.FC = () => {
  // Animation values
  const opacityMainText = useSharedValue(0);
  const translateYMainText = useSharedValue(20);
  const opacitySubText = useSharedValue(0);
  const translateYSubText = useSharedValue(20);

  useEffect(() => {
    // Start animations after component mounts
    opacityMainText.value = withDelay(300, withSpring(1, { damping: 20 }));
    translateYMainText.value = withDelay(300, withSpring(0, { damping: 20 }));
    opacitySubText.value = withDelay(600, withSpring(1, { damping: 20 }));
    translateYSubText.value = withDelay(600, withSpring(0, { damping: 20 }));
  }, []);

  // Create animated styles
  const mainContentStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityMainText.value,
      transform: [{ translateY: translateYMainText.value }],
    };
  });
  const subContentStyle = useAnimatedStyle(() => {
    return {
      opacity: opacitySubText.value,
      transform: [{ translateY: translateYSubText.value }],
    };
  });
  return (
    <View className="px-6 w-full items-center pt-20 pb-10">
      <Animated.View style={mainContentStyle}>
        <Text className="text-4xl font-bold text-center text-gray-900 mb-2">
          Discover Your
        </Text>
        <Text className="text-4xl font-bold text-center text-gray-900 mb-6">
          Best Products Here
        </Text>
      </Animated.View>

      <Animated.View style={subContentStyle}>
        <Text className="text-base text-gray-500 text-center mb-12 max-w-xs">
          Explore all the most exiting best products based on your interest and
          needs here
        </Text>
      </Animated.View>
    </View>
  );
};

export default WelcomeText;
