import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export type ProfileOption = {
  id: string;
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  showArrow?: boolean;
};

// Separate component for profile option items
export const ProfileOptionItem = ({
  option,
  index,
  baseDelay = 600,
}: {
  option: ProfileOption;
  index: number;
  baseDelay?: number;
}) => {
  const scaleValue = useSharedValue(1);

  const handlePressIn = () => {
    scaleValue.value = withTiming(0.98, { duration: 50 });
  };

  const handlePressOut = () => {
    scaleValue.value = withTiming(1, { duration: 50 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
    };
  });

  return (
    <AnimatedTouchable
      key={option.id}
      className="flex-row items-center py-3.5 px-4"
      onPress={option.onPress}
      activeOpacity={0.7}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
      entering={FadeInRight.delay(index * 80 + baseDelay).duration(300)}
    >
      <View className="w-8 h-8 rounded-full justify-center items-center mr-3">
        {option.icon}
      </View>
      <Text className="flex-1 text-base">{option.title}</Text>
      {option.showArrow && (
        <Feather name="chevron-right" size={20} color="#C4C4C4" />
      )}
    </AnimatedTouchable>
  );
};

type ProfileOptionsListProps = {
  title?: string;
  options: ProfileOption[];
  baseDelay?: number;
};

const ProfileOptionsList = ({
  title,
  options,
  baseDelay = 600,
}: ProfileOptionsListProps) => {
  return (
    <View className="mb-6">
      {title && (
        <Animated.Text
          className="text-gray-500 uppercase text-xs font-medium ml-4 mb-1"
          entering={FadeInRight.delay(baseDelay - 100).duration(300)}
        >
          {title}
        </Animated.Text>
      )}
      <View className="bg-white rounded-xl shadow-soft-1">
        {options.map((option, index) => (
          <ProfileOptionItem
            key={option.id}
            option={option}
            index={index}
            baseDelay={baseDelay}
          />
        ))}
      </View>
    </View>
  );
};

export default ProfileOptionsList;
