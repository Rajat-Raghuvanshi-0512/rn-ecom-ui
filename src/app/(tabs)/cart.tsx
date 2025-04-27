import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { useCart } from '../../context/CartContext';
import { productDetails } from '../../utils/constants/productDetails';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  FadeInDown,
  FadeInUp,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const { width } = Dimensions.get('window');

export default function CartScreen() {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [showBackButton, setShowBackButton] = useState(false);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Shared values for animations
  const checkoutScale = useSharedValue(1);
  const floatingContainerTranslateY = useSharedValue(0);
  const couponInputWidth = useSharedValue(width - 32);

  // Check if we should show the back button (if we came from product details)
  useEffect(() => {
    // We'll use the navigation state to determine if we came from a product page
    // @ts-ignore - accessing private API
    const routes = navigation.getState()?.routes;
    const prevRoute = routes?.[routes.length - 2]?.name;

    // If previous route contains "product", we came from product details
    setShowBackButton(prevRoute?.includes('product') || false);

    // Initial animations
    floatingContainerTranslateY.value = withSpring(0, {
      damping: 15,
      stiffness: 100,
    });
  }, [navigation]);

  // Get cart items with product details
  const cartItems = items.map((item) => ({
    ...item,
    ...productDetails[item.id],
  }));

  // Calculate totals
  const subtotal = getCartTotal();
  const total = subtotal; // In a real app, you might apply discounts here

  // Handle quantity changes
  const handleUpdateQuantity = (id: number, change: number) => {
    // Trigger a little bounce animation
    const item = items.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + change);
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart is empty', 'Add some products to your cart first');
      return;
    }

    // Animate checkout button when pressed
    checkoutScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );

    // In a real app, this would navigate to checkout or payment
    Alert.alert('Checkout', 'Proceeding to checkout with your items');
  };

  // Coupon input animation on focus
  const handleCouponFocus = () => {
    couponInputWidth.value = withTiming(width - 120, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  // Coupon input animation on blur
  const handleCouponBlur = () => {
    couponInputWidth.value = withTiming(width - 32, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  // Save item for later (favorite)
  const handleSaveForLater = (id: number) => {
    // In a real app, this would add to favorites/wishlist
    Alert.alert('Saved', 'Item saved to your favorites');
    removeFromCart(id);
  };

  // Animation styles
  const checkoutButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: checkoutScale.value }],
    };
  });

  const floatingContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: floatingContainerTranslateY.value }],
    };
  });

  const couponInputStyle = useAnimatedStyle(() => {
    return {
      width: couponInputWidth.value,
    };
  });

  // Handle empty cart
  if (cartItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" />

        {/* Header */}
        <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
          {showBackButton && (
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
          )}
          <Text
            className={`text-lg font-semibold ${
              !showBackButton ? 'text-center flex-1' : ''
            }`}
          >
            My Cart
          </Text>
        </View>

        <Animated.View
          className="flex-1 justify-center items-center p-6"
          entering={FadeInDown.duration(600).springify()}
        >
          <Ionicons name="cart-outline" size={80} color="#ddd" />
          <Text className="text-xl font-semibold mt-6 mb-2">
            Your cart is empty
          </Text>
          <Text className="text-gray-500 text-center mb-6">
            Looks like you haven't added any products to your cart yet.
          </Text>
          <AnimatedTouchable
            className="bg-primary px-6 py-3 rounded-full"
            onPress={() => router.push('/home')}
            entering={FadeInUp.delay(300).duration(500)}
          >
            <Text className="text-white font-semibold">Start Shopping</Text>
          </AnimatedTouchable>
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Header */}
      <Animated.View
        className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100"
        entering={FadeInDown.duration(400).springify()}
      >
        {showBackButton ? (
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
        ) : (
          <View className="w-8" />
        )}
        <Text className="text-lg font-semibold">My Cart</Text>
        <TouchableOpacity onPress={() => clearCart()}>
          <Text className="text-primary font-medium">Clear</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Cart Items */}
      <ScrollView
        className="flex-1 mb-60" // Add bottom margin for the floating container
        showsVerticalScrollIndicator={false}
      >
        {cartItems.map((item, index) => (
          <Animated.View
            key={item.id}
            className="flex-row bg-gray-50 mx-4 my-2 p-3 rounded-xl"
            entering={FadeInDown.delay(index * 100).duration(400)}
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

            {/* Bookmark/Save Icon */}
            <TouchableOpacity
              className="self-start mb-2"
              onPress={() => handleSaveForLater(item.id)}
            >
              <Ionicons name="bookmark-outline" size={18} color="#7F00FF" />
            </TouchableOpacity>

            {/* Quantity Controls */}
            <View className="flex-row items-center ml-2 self-end">
              <TouchableOpacity
                onPress={() => handleUpdateQuantity(item.id, -1)}
                className="mr-3"
              >
                <Text className="text-xl font-bold text-gray-400">-</Text>
              </TouchableOpacity>

              <Text className="text-base">{item.quantity}</Text>

              <TouchableOpacity
                onPress={() => handleUpdateQuantity(item.id, 1)}
                className="ml-3"
              >
                <Text className="text-xl font-bold text-gray-400">+</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}

        {/* Add some extra space at the bottom */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Floating Checkout Container */}
      <Animated.View
        style={[
          floatingContainerStyle,
          {
            paddingBottom: insets.bottom > 0 ? insets.bottom : 16,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          },
        ]}
        className="bg-white rounded-t-3xl shadow-xl pt-4 px-4"
        entering={FadeInUp.duration(600).springify()}
      >
        {/* Discount Code */}
        <View className="flex-row mb-4 items-center">
          <Animated.View style={couponInputStyle}>
            <TextInput
              className="p-3 rounded-lg bg-gray-50"
              placeholder="Enter Discount Code"
              value={discountCode}
              onChangeText={setDiscountCode}
              onFocus={handleCouponFocus}
              onBlur={handleCouponBlur}
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(400)}>
            <TouchableOpacity className="p-2 ml-2">
              <Text className="text-primary font-medium">Apply</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Order Summary */}
        <View className="flex-row justify-between mb-3">
          <Text className="text-gray-500">Subtotal</Text>
          <Text className="font-semibold">${subtotal.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between mb-5">
          <Text className="text-gray-500">Total</Text>
          <Text className="font-bold text-lg">${total.toFixed(2)}</Text>
        </View>

        {/* Checkout Button */}
        <AnimatedTouchable
          style={checkoutButtonStyle}
          className="bg-primary p-4 rounded-full items-center"
          onPress={handleCheckout}
        >
          <Text className="text-white font-semibold">Checkout</Text>
        </AnimatedTouchable>
      </Animated.View>
    </SafeAreaView>
  );
}
