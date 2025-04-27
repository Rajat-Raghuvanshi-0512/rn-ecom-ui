import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  FadeOutRight,
  LinearTransition,
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type FavoriteItemProps = {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    sellerName: string;
  };
  index: number;
  onRemove: (id: number) => void;
  onPress: (id: number) => void;
};

const FavoriteItem = ({
  item,
  index,
  onRemove,
  onPress,
}: FavoriteItemProps) => {
  return (
    <AnimatedTouchable
      className="flex-row bg-gray-50 mx-4 my-2 p-3 rounded-xl"
      onPress={() => onPress(item.id)}
      activeOpacity={0.7}
      entering={FadeInDown.delay(index * 100).duration(400)}
      exiting={FadeOutRight.duration(300)}
      layout={LinearTransition.springify()}
    >
      {/* Product Image */}
      <Image
        source={{ uri: item.image }}
        className="w-20 h-20 rounded-lg bg-gray-200"
      />

      {/* Product Info */}
      <View className="flex-1 ml-3 justify-between">
        <View>
          <Text className="font-semibold text-base">{item.name}</Text>
          <Text className="text-gray-400 text-sm">{item.sellerName}</Text>
        </View>
        <Text className="font-semibold">${item.price.toFixed(2)}</Text>
      </View>

      {/* Remove button */}
      <AnimatedTouchable
        className="self-center"
        onPress={(e) => {
          e.stopPropagation();
          onRemove(item.id);
        }}
        entering={FadeInDown.delay(index * 100 + 200)}
      >
        <Ionicons name="bookmark" size={18} color="#7F00FF" />
      </AnimatedTouchable>
    </AnimatedTouchable>
  );
};

export default FavoriteItem;
