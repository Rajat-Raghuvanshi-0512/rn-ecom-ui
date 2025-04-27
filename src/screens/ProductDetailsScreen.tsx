import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  Animated as RNAnimated,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface ProductDetailsProps {
  route?: { params: { productId: number } };
}

// This would typically come from an API or props, but we'll hardcode it for this example
const productDetails = {
  id: 1,
  name: 'Wireless Headphones',
  price: 70.0,
  image:
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000',
  colors: ['#1E1E1E', '#FF6B6B', '#FFA41B', '#00A8E8', '#777777'],
  sellerName: 'Syed Noman',
  rating: 4.8,
  totalReviews: 320,
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  images: [
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000',
    'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=1000',
    'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000',
    'https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=1000',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000',
  ],
  specifications: [
    { label: 'Brand', value: 'Sony' },
    { label: 'Model', value: 'WH-1000XM4' },
    { label: 'Color', value: 'Silver' },
    { label: 'Connectivity', value: 'Bluetooth 5.0' },
    { label: 'Battery Life', value: 'Up to 30 hours' },
  ],
};

const ProductDetailsScreen = ({ route }: ProductDetailsProps) => {
  const router = useRouter();
  const safeArea = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Description');
  const [activeColor, setActiveColor] = useState(productDetails.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Add animation for header background
  const scrollY = useRef(new RNAnimated.Value(0)).current;
  const headerBg = scrollY.interpolate({
    inputRange: [0, 350],
    outputRange: ['transparent', 'white'],
    extrapolate: 'clamp',
  });

  const headerShadow = scrollY.interpolate({
    inputRange: [0, 350],
    outputRange: [0, 0.2],
    extrapolate: 'clamp',
  });

  // Animation values
  const scale = useSharedValue(1);
  const addButtonScale = useSharedValue(1);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: addButtonScale.value }],
    };
  });

  const handleColorSelect = (color: string) => {
    setActiveColor(color);
  };

  const handleImageChange = (index: number) => {
    setActiveImageIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const renderImageItem = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => (
    <View
      style={{
        width,
        height: 400,
        backgroundColor: '#f9f9f9',
      }}
    >
      <View style={{ height: '100%' }}>
        <Animated.View style={[imageAnimatedStyle, { height: '100%' }]}>
          <Image
            source={{ uri: item }}
            style={{ width, height: 400 }}
            resizeMode="cover"
          />
        </Animated.View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 relative bg-white">
      <StatusBar style="dark" />

      {/* Header with animated background */}
      <RNAnimated.View
        className="flex-row items-center justify-between px-4 py-2 absolute top-0 left-0 right-0 z-10"
        style={{
          paddingTop: safeArea.top,
          backgroundColor: headerBg,
          shadowOpacity: headerShadow,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: scrollY.interpolate({
            inputRange: [0, 350],
            outputRange: [0, 3],
            extrapolate: 'clamp',
          }),
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
        >
          <Feather name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>

        <View className="flex-row">
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white items-center justify-center mr-2 shadow-sm">
            <Feather name="share-2" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm">
            <Feather name="heart" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </RNAnimated.View>

      <ScrollView
        className="flex-1 bg-white"
        contentContainerClassName="pb-40"
        showsVerticalScrollIndicator={false}
        onScroll={RNAnimated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Product Images Carousel */}
        <View className="relative">
          <FlatList
            ref={flatListRef}
            data={productDetails.images}
            renderItem={renderImageItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveImageIndex(index);
            }}
          />

          {/* Carousel Indicator */}
          <View className="flex-row justify-center absolute bottom-6 left-0 right-0 z-10">
            {productDetails.images.map((_, index) => (
              <TouchableOpacity
                key={index}
                className={`h-1.5 rounded-full mx-0.5 ${
                  index === activeImageIndex
                    ? 'w-4 bg-primary'
                    : 'w-1.5 bg-white opacity-70'
                }`}
                onPress={() => handleImageChange(index)}
              />
            ))}
          </View>
        </View>

        {/* Product Details */}
        <View className="px-4 mt-4">
          <Text className="text-2xl font-bold">{productDetails.name}</Text>
          <Text className="text-xl font-bold text-primary mt-1">
            ${productDetails.price.toFixed(2)}
          </Text>

          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-gray-600">
              Seller: {productDetails.sellerName}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={16} color="#FFC107" />
              <Text className="mx-1 font-medium">{productDetails.rating}</Text>
              <Text className="text-gray-500">
                ({productDetails.totalReviews} Reviews)
              </Text>
            </View>
          </View>

          {/* Color Selection */}
          <View className="mt-4">
            <Text className="text-base font-bold mb-2">Color</Text>
            <View className="flex-row">
              {productDetails.colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  className={`w-8 h-8 rounded-full mr-2 items-center justify-center ${
                    color === activeColor ? 'border-2 border-primary' : ''
                  }`}
                  onPress={() => handleColorSelect(color)}
                >
                  <View
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Tabs */}
          <View className="flex-row border-b border-gray-200 mt-6">
            {['Description', 'Specifications', 'Reviews'].map((tab) => (
              <TouchableOpacity
                key={tab}
                className={`px-4 py-2 ${
                  activeTab === tab ? 'border-b-2 border-primary' : ''
                }`}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  className={`${
                    activeTab === tab
                      ? 'text-primary font-bold'
                      : 'text-gray-500'
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          <View className="py-4">
            {activeTab === 'Description' && (
              <Text className="text-gray-600 leading-5">
                {productDetails.description}
              </Text>
            )}

            {activeTab === 'Specifications' && (
              <View>
                {productDetails.specifications.map((spec, index) => (
                  <View
                    key={index}
                    className="flex-row justify-between py-2 border-b border-gray-100"
                  >
                    <Text className="text-gray-500">{spec.label}</Text>
                    <Text className="font-medium">{spec.value}</Text>
                  </View>
                ))}
              </View>
            )}

            {activeTab === 'Reviews' && (
              <View className="items-center py-4">
                <Text className="text-gray-500">Reviews coming soon</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View className="flex-row items-center justify-between gap-2 py-3 px-4 rounded-full bg-violet-200 absolute bottom-10 w-[90%] left-1/2 -translate-x-[50%] shadow-hard-3">
        <View className="flex-row items-center rounded-full bg-white p-2">
          <TouchableOpacity
            className="w-8 h-8 rounded items-center justify-center"
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Feather name="minus" size={18} color="#000" />
          </TouchableOpacity>

          <Text className="mx-3 text-lg font-bold">{quantity}</Text>

          <TouchableOpacity
            className="w-8 h-8 rounded items-center justify-center"
            onPress={() => setQuantity(quantity + 1)}
          >
            <Feather name="plus" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        <View>
          <Animated.View style={buttonAnimatedStyle}>
            <TouchableOpacity
              className="bg-primary px-10 py-4 rounded-full"
              onPressIn={() => {
                addButtonScale.value = withSpring(0.95);
              }}
              onPressOut={() => {
                addButtonScale.value = withSpring(1);
              }}
            >
              <Text className="text-white font-bold text-xl">Add to Cart</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;
