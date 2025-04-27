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
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface PromoBannerItem {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
  bgColor: string;
}

const banners: PromoBannerItem[] = [
  {
    id: 1,
    title: 'Super Sale Discount',
    subtitle: 'Up to 50%',
    buttonText: 'Shop Now',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000',
    bgColor: '#f3f4f6', // light gray
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Summer Collection',
    buttonText: 'Explore',
    image:
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000',
    bgColor: '#ede9fe', // light purple
  },
  {
    id: 3,
    title: 'Limited Edition',
    subtitle: 'Premium Items',
    buttonText: 'View All',
    image:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000',
    bgColor: '#e6f7ff', // light blue
  },
];

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
