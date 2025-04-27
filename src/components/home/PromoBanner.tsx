import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { banners, PromoBannerItem } from '../../utils/constants';

const { width } = Dimensions.get('window');

const PromoBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scale = useSharedValue(1);

  // Auto-sliding effect
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length;
      setActiveIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const renderBannerItem = ({ item }: { item: PromoBannerItem }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={() => {
        scale.value = withSpring(0.98);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      style={{ width }}
    >
      <View
        className="mx-4 rounded-xl overflow-hidden h-40"
        style={{ backgroundColor: item.bgColor }}
      >
        <Animated.View style={animatedStyle} className="h-full">
          <View className="flex-row h-full">
            <View className="p-4 justify-center flex-1">
              <Text className="text-xl font-bold text-gray-800">
                {item.title}
              </Text>
              <Text className="text-lg font-bold text-primary mb-2">
                {item.subtitle}
              </Text>
              <TouchableOpacity className="bg-primary py-2 px-4 rounded-full w-24 items-center">
                <Text className="text-white font-medium">
                  {item.buttonText}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-36 justify-center items-center">
              <Image
                source={{ uri: item.image }}
                style={{ width: 120, height: 120 }}
                resizeMode="contain"
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Animated.View className="my-2" entering={FadeIn.duration(600).delay(300)}>
      <FlatList
        ref={flatListRef}
        data={banners}
        renderItem={renderBannerItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
      />

      {/* Carousel Indicator */}
      <View className="flex-row justify-center mt-2">
        {banners.map((_, index) => (
          <TouchableOpacity
            key={index}
            className={`h-1.5 rounded-full mx-0.5 ${
              index === activeIndex ? 'w-4 bg-primary' : 'w-1.5 bg-gray-300'
            }`}
            onPress={() => {
              setActiveIndex(index);
              flatListRef.current?.scrollToIndex({
                index,
                animated: true,
              });
            }}
          />
        ))}
      </View>
    </Animated.View>
  );
};

export default PromoBanner;
