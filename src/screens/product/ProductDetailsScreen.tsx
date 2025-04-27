import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Animated as RNAnimated, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { productDetails as productDetailsData } from '../../utils/constants/productDetails';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

// Import components
import ProductHeader from '../../components/product/ProductHeader';
import ProductImageGallery from '../../components/product/ProductImageGallery';
import ProductInfo from '../../components/product/ProductInfo';
import ColorSelector from '../../components/product/ColorSelector';
import ProductTabs from '../../components/product/ProductTabs';
import AddToCartButton from '../../components/product/AddToCartButton';

type ProductTab = 'Description' | 'Specifications' | 'Reviews';

interface ProductDetailsProps {
  route?: { params: { productId: number } };
}

const ProductDetailsScreen = ({ route }: ProductDetailsProps) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const productId = route?.params?.productId ?? 1;
  const productDetails = productDetailsData[productId];
  const isProductFavorite = isFavorite(productId);

  const [activeTab, setActiveTab] = useState<ProductTab>('Description');
  const [activeColor, setActiveColor] = useState(productDetails.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Add animation for header background
  const scrollY = useRef(new RNAnimated.Value(0)).current;

  // Animation values for enhanced animations
  const scale = useSharedValue(1);
  const addButtonScale = useSharedValue(1);
  const priceScale = useSharedValue(0.9);
  const nameOpacity = useSharedValue(0);
  const tabsTranslateY = useSharedValue(20);
  const colorsTranslateX = useSharedValue(-20);

  // Initialize animations
  useEffect(() => {
    nameOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
    priceScale.value = withDelay(500, withSpring(1, { damping: 12 }));
    tabsTranslateY.value = withDelay(700, withTiming(0, { duration: 500 }));
    colorsTranslateX.value = withDelay(400, withTiming(0, { duration: 400 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  };

  const handleTabPress = (tab: ProductTab) => {
    // Add a subtle animation when changing tabs
    tabsTranslateY.value = withSequence(
      withTiming(2, { duration: 100 }),
      withTiming(0, { duration: 200 })
    );
    setActiveTab(tab);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    // Animate button press
    addButtonScale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );

    // Add to cart - the API only accepts one item at a time, so we need to call it multiple times
    for (let i = 0; i < quantity; i++) {
      addToCart(productId);
    }

    // Show success message
    Alert.alert(
      'Added to Cart',
      `${quantity} ${productDetails.name} added to your cart!`,
      [
        {
          text: 'Continue Shopping',
          style: 'cancel',
        },
        {
          text: 'Go to Cart',
          onPress: () => router.push('/cart'),
        },
      ]
    );
  };

  // Handle toggling favorite
  const handleToggleFavorite = () => {
    if (isProductFavorite) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Floating Header */}
      <ProductHeader
        scrollY={scrollY}
        onToggleFavorite={handleToggleFavorite}
        isProductFavorite={isProductFavorite}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        onScroll={RNAnimated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Product Images */}
        <ProductImageGallery
          images={productDetails.images}
          activeImageIndex={activeImageIndex}
          onImageChange={handleImageChange}
          imageAnimatedStyle={imageAnimatedStyle}
        />

        {/* Product Information */}
        <ProductInfo
          name={productDetails.name}
          price={productDetails.price}
          rating={productDetails.rating}
          totalReviews={productDetails.totalReviews}
          sellerName={productDetails.sellerName}
          nameAnimatedStyle={nameAnimatedStyle}
          priceAnimatedStyle={priceAnimatedStyle}
        />

        {/* Colors */}
        <ColorSelector
          colors={productDetails.colors}
          activeColor={activeColor}
          onColorSelect={handleColorSelect}
          colorsAnimatedStyle={colorsAnimatedStyle}
        />

        {/* Tabs: Description, Specifications, Reviews */}
        <ProductTabs
          activeTab={activeTab}
          onTabPress={handleTabPress}
          description={productDetails.description}
          specifications={productDetails.specifications}
          tabsAnimatedStyle={tabsAnimatedStyle}
        />

        {/* Add spacing at the bottom to account for the add to cart button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Add to Cart Button with Quantity Selector */}
      <AddToCartButton
        onPress={handleAddToCart}
        buttonAnimatedStyle={buttonAnimatedStyle}
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
      />
    </View>
  );
};

export default ProductDetailsScreen;
