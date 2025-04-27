import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const SearchBar = () => {
  const inputWidth = useSharedValue(90);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: `${inputWidth.value}%`,
    };
  });

  return (
    <Animated.View
      className="px-4 py-2"
      entering={FadeIn.duration(400).delay(200)}
    >
      <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
        <Feather name="search" size={20} color="#666" />
        <Animated.View style={[{ flex: 1 }, animatedStyles]}>
          <TextInput
            placeholder="Search..."
            className="ml-2 flex-1"
            placeholderTextColor="#999"
            onFocus={() => {
              inputWidth.value = withSpring(85);
            }}
            onBlur={() => {
              inputWidth.value = withSpring(90);
            }}
          />
        </Animated.View>
        <TouchableOpacity>
          <Feather name="sliders" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default SearchBar;
