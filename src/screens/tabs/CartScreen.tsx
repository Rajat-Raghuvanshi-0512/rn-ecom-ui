import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from 'expo-router';
import { useCart } from '../../context/CartContext';
import { productDetails } from '../../utils/constants/productDetails';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

// Import components
import CartHeader from '../../components/cart/CartHeader';
import EmptyCart from '../../components/cart/EmptyCart';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';

const { width } = Dimensions.get('window');

const CartScreen = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [showBackButton, setShowBackButton] = useState(false);
  const navigation = useNavigation();

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
  const cartItems = items.map((item) => {
    const details = productDetails[item.id];
    return {
      ...item,
      ...details,
      // Map name to title for compatibility with CartItem component
      title: details.name,
    };
  });

  // Calculate totals
  const subtotal = getCartTotal();
  const total = subtotal; // In a real app, you might apply discounts here

  // Handle quantity changes
  const handleUpdateQuantity = (id: number, change: number) => {
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
        <CartHeader showBackButton={showBackButton} />
        <EmptyCart />
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" />

        {/* Header */}
        <CartHeader
          showBackButton={showBackButton}
          itemCount={cartItems.length}
          onClearCart={() => {
            Alert.alert(
              'Clear Cart',
              'Are you sure you want to remove all items from your cart?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Clear',
                  onPress: () => clearCart(),
                  style: 'destructive',
                },
              ]
            );
          }}
        />

        {/* Cart Items List */}
        <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
          {cartItems.map((item, index) => (
            <CartItem
              key={item.id}
              item={item}
              index={index}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={removeFromCart}
              onSaveForLater={handleSaveForLater}
            />
          ))}
          <View className="h-[300px]" />
        </ScrollView>

        {/* Checkout Section */}
        <Animated.View
          className="absolute bottom-0 left-0 right-0"
          style={[floatingContainerStyle]}
        >
          <CartSummary
            subtotal={subtotal}
            total={total}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
            couponInputStyle={couponInputStyle}
            checkoutButtonStyle={checkoutButtonStyle}
            handleCouponFocus={handleCouponFocus}
            handleCouponBlur={handleCouponBlur}
            handleCheckout={handleCheckout}
          />
        </Animated.View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CartScreen;
