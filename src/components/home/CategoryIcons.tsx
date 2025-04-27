import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
  Feather,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Category, categories } from '../../utils/constants';

type CategoryIconProps = {
  item: Category;
  index: number;
  isActive: boolean;
  onPress: (item: Category) => void;
};

const CategoryIcon = ({
  item,
  index,
  isActive,
  onPress,
}: CategoryIconProps) => {
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const getIcon = () => {
    switch (item.type) {
      case 'material':
        return (
          <MaterialIcons
            name={item.icon}
            size={24}
            color={isActive ? '#fff' : '#000'}
          />
        );
      case 'ionicons':
        return (
          <Ionicons
            name={item.icon}
            size={24}
            color={isActive ? '#fff' : '#000'}
          />
        );
      case 'material-community':
        return (
          <MaterialCommunityIcons
            name={item.icon}
            size={24}
            color={isActive ? '#fff' : '#000'}
          />
        );
      default:
        return (
          <Feather
            name={item.icon}
            size={24}
            color={isActive ? '#fff' : '#000'}
          />
        );
    }
  };

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 100)}>
      <TouchableOpacity
        className={`items-center mx-2`}
        onPress={() => onPress(item)}
        onPressIn={() => {
          scale.value = withSpring(0.9);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
      >
        <Animated.View style={animatedStyles}>
          <View
            className={`w-14 h-14 rounded-full justify-center items-center mb-1 ${
              isActive ? 'bg-primary' : 'bg-gray-100'
            }`}
          >
            {getIcon()}
          </View>
        </Animated.View>
        <Text
          className={`text-xs font-medium ${
            isActive ? 'text-primary' : 'text-gray-700'
          }`}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

type CategoryIconsProps = {
  onSelectCategory: (category: Category) => void;
  activeCategory: Category;
};

const CategoryIcons = ({
  onSelectCategory,
  activeCategory,
}: CategoryIconsProps) => {
  return (
    <View className="my-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {categories.map((item, index) => (
          <CategoryIcon
            key={item.id}
            item={item}
            index={index}
            isActive={activeCategory.id === item.id}
            onPress={onSelectCategory}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryIcons;
