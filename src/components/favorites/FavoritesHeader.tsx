import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  FadeInDown,
  LinearTransition,
} from 'react-native-reanimated';

type FavoritesHeaderProps = {
  isEmpty: boolean;
  onClearAll: () => void;
  headerAnimatedStyle?: any;
};

const FavoritesHeader = ({
  isEmpty,
  onClearAll,
  headerAnimatedStyle,
}: FavoritesHeaderProps) => {
  if (isEmpty) {
    return (
      <Animated.View
        style={headerAnimatedStyle}
        className="px-4 py-3 border-b border-gray-100"
      >
        <Text className="text-xl font-semibold text-center">Favourites</Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100"
      entering={FadeInDown.duration(400)}
      layout={LinearTransition.springify()}
    >
      <View className="w-8" />
      <Text className="text-xl font-semibold">Favourites</Text>
      <TouchableOpacity onPress={onClearAll}>
        <Text className="text-primary font-medium">Clear</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FavoritesHeader;
