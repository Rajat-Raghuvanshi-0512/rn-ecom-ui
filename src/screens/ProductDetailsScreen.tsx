import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  Animated as RNAnimated,
  Alert,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  FadeIn,
  FadeInRight,
  FadeInDown,
  SlideInDown,
  SlideInUp,
  ZoomIn,
  interpolate,
  LinearTransition,
  Extrapolation,
} from 'react-native-reanimated';
import { productDetails as productDetailsData } from '../utils/constants/productDetails';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const { width } = Dimensions.get('window');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ProductDetailsProps {
  route?: { params: { productId: number } };
}

const ProductDetailsScreen = ({ route }: ProductDetailsProps) => {
  const router = useRouter();
  const safeArea = useSafeAreaInsets();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const productId = route?.params?.productId ?? 1;
  const productDetails = productDetailsData[productId];
  const isProductFavorite = isFavorite(productId);

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

  // Animation values for enhanced animations
  const scale = useSharedValue(1);
  const addButtonScale = useSharedValue(1);
  const priceScale = useSharedValue(0.9);
  const nameOpacity = useSharedValue(0);
  const quantityContainerScale = useSharedValue(0.8);
  const tabsTranslateY = useSharedValue(20);
  const colorsTranslateX = useSharedValue(-20);

  // Initialize animations
  useEffect(() => {
    nameOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
    priceScale.value = withDelay(500, withSpring(1, { damping: 12 }));
    quantityContainerScale.value = withDelay(
      600,
      withSpring(1, { damping: 14 })
    );
    tabsTranslateY.value = withDelay(700, withTiming(0, { duration: 500 }));
    colorsTranslateX.value = withDelay(400, withTiming(0, { duration: 400 }));
  }, []);

  // Animated styles for new animations
  const priceAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: priceScale.value }],
    opacity: priceScale.value,
  }));

  const nameAnimatedStyle = useAnimatedStyle(() => ({
    opacity: nameOpacity.value,
    transform: [
      {
        translateY: interpolate(
          nameOpacity.value,
          [0, 1],
          [10, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  const tabsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: tabsTranslateY.value }],
    opacity: interpolate(
      tabsTranslateY.value,
      [20, 0],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const colorsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: colorsTranslateX.value }],
    opacity: interpolate(
      colorsTranslateX.value,
      [-20, 0],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

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

  const handleTabPress = (tab: string) => {
    // Add a subtle animation when changing tabs
    tabsTranslateY.value = withSequence(
      withTiming(2, { duration: 100 }),
      withTiming(0, { duration: 200 })
    );
    setActiveTab(tab);
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
        <Animated.View
          style={[imageAnimatedStyle, { height: '100%' }]}
          entering={ZoomIn.duration(400)}
        >
          <Image
            source={{ uri: item }}
            style={{ width, height: 400 }}
            resizeMode="cover"
          />
        </Animated.View>
      </View>
    </View>
  );

  // Handle add to cart
  const handleAddToCart = () => {
    // Animate button press
    addButtonScale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );

    // Add to cart with the current quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(productId);
    }

    // Show success message
    Alert.alert(
      'Added to Cart',
      `${quantity} ${productDetails.name} has been added to your cart`,
      [
        {
          text: 'Continue Shopping',
          style: 'cancel',
        },
        {
          text: 'View Cart',
          onPress: () => router.push('/(tabs)/cart'),
        },
      ]
    );
  };

  // Handle favorite toggle with animation
  const handleToggleFavorite = () => {
    // Add heart pulse animation
    addButtonScale.value = withSequence(
      withTiming(1.2, { duration: 150 }),
      withTiming(1, { duration: 150 })
    );

    if (isProductFavorite) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  // Handle quantity change with animation
  const handleQuantityChange = (change: number) => {
    // Animate quantity buttons
    quantityContainerScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 150 })
    );

    setQuantity(Math.max(1, quantity + change));
  };

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
        <AnimatedTouchable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
          entering={FadeIn.duration(400)}
        >
          <Feather name="chevron-left" size={24} color="#000" />
        </AnimatedTouchable>

        <Animated.View
          className="flex-row"
          entering={FadeIn.delay(200).duration(500)}
        >
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white items-center justify-center mr-2 shadow-sm">
            <Feather name="share-2" size={20} color="#000" />
          </TouchableOpacity>
          <AnimatedTouchable
            className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
            onPress={handleToggleFavorite}
            style={[buttonAnimatedStyle]}
          >
            <Feather
              name="heart"
              size={20}
              color={isProductFavorite ? '#7F00FF' : '#000'}
            />
          </AnimatedTouchable>
        </Animated.View>
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
        <Animated.View className="relative" entering={FadeIn.duration(400)}>
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
          <Animated.View
            className="flex-row justify-center absolute bottom-6 left-0 right-0 z-10"
            entering={SlideInUp.duration(600).delay(300)}
          >
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
          </Animated.View>
        </Animated.View>

        {/* Product Details */}
        <View className="px-4 mt-4">
          <Animated.Text
            className="text-2xl font-bold"
            style={nameAnimatedStyle}
          >
            {productDetails.name}
          </Animated.Text>

          <Animated.Text
            className="text-xl font-bold text-primary mt-1"
            style={priceAnimatedStyle}
          >
            ${productDetails.price.toFixed(2)}
          </Animated.Text>

          <Animated.View
            className="flex-row justify-between items-center mt-2"
            entering={FadeInRight.delay(400).duration(500)}
          >
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
          </Animated.View>

          {/* Color Selection */}
          <Animated.View className="mt-4" style={colorsAnimatedStyle}>
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
          </Animated.View>

          {/* Tabs */}
          <Animated.View
            className="flex-row border-b border-gray-200 mt-6"
            style={tabsAnimatedStyle}
          >
            {['Description', 'Specifications', 'Reviews'].map((tab) => (
              <TouchableOpacity
                key={tab}
                className={`px-4 py-2 ${
                  activeTab === tab ? 'border-b-2 border-primary' : ''
                }`}
                onPress={() => handleTabPress(tab)}
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
          </Animated.View>

          {/* Tab Content */}
          <Animated.View
            className="py-4"
            entering={FadeIn.duration(400).delay(400)}
            layout={LinearTransition.springify()}
          >
            {activeTab === 'Description' && (
              <Animated.Text
                className="text-gray-600 leading-5"
                entering={FadeIn.duration(400)}
              >
                {productDetails.description}
              </Animated.Text>
            )}

            {activeTab === 'Specifications' && (
              <Animated.View entering={FadeIn.duration(400)}>
                {productDetails.specifications.map((spec, index) => (
                  <Animated.View
                    key={index}
                    className="flex-row justify-between py-2 border-b border-gray-100"
                    entering={FadeInDown.delay(index * 50).duration(300)}
                  >
                    <Text className="text-gray-500">{spec.label}</Text>
                    <Text className="font-medium">{spec.value}</Text>
                  </Animated.View>
                ))}
              </Animated.View>
            )}

            {activeTab === 'Reviews' && (
              <Animated.View
                className="items-center py-4"
                entering={FadeIn.duration(400)}
              >
                <Text className="text-gray-500">Reviews coming soon</Text>
              </Animated.View>
            )}
          </Animated.View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <Animated.View
        className="flex-row items-center justify-between gap-2 py-3 px-4 rounded-full bg-violet-200 absolute bottom-10 w-[90%] left-1/2 -translate-x-[50%] shadow-hard-3"
        entering={SlideInDown.duration(600).delay(300)}
      >
        <View className="flex-row items-center rounded-full bg-white p-2">
          <TouchableOpacity
            className="w-8 h-8 rounded items-center justify-center"
            onPress={() => handleQuantityChange(-1)}
          >
            <Feather name="minus" size={18} color="#000" />
          </TouchableOpacity>

          <Text className="mx-3 text-lg font-bold">{quantity}</Text>

          <TouchableOpacity
            className="w-8 h-8 rounded items-center justify-center"
            onPress={() => handleQuantityChange(1)}
          >
            <Feather name="plus" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        <View>
          <Animated.View style={buttonAnimatedStyle}>
            <TouchableOpacity
              className="bg-primary px-10 py-4 rounded-full"
              onPress={handleAddToCart}
            >
              <Text className="text-white font-bold text-xl">Add to Cart</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

export default ProductDetailsScreen;
