import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

type ColorSelectorProps = {
  colors: string[];
  activeColor: string;
  onColorSelect: (color: string) => void;
  colorsAnimatedStyle: any;
};

const ColorSelector = ({
  colors,
  activeColor,
  onColorSelect,
  colorsAnimatedStyle,
}: ColorSelectorProps) => {
  return (
    <Animated.View className="mt-6 px-4" style={colorsAnimatedStyle}>
      <Text className="text-base font-medium mb-2">Colors</Text>
      <View className="flex-row">
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => onColorSelect(color)}
            className={`mr-4 items-center ${
              activeColor === color ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <View
              className={`w-10 h-10 rounded-full mb-1 ${
                activeColor === color
                  ? 'border-2 border-primary'
                  : 'border border-gray-300'
              }`}
              style={{
                backgroundColor: color.toLowerCase(),
                padding: 2,
              }}
            >
              <View
                className="w-full h-full rounded-full"
                style={{ backgroundColor: color.toLowerCase() }}
              />
            </View>
            <Text className="text-xs">
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

export default ColorSelector;
