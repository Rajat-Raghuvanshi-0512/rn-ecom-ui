import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, useAnimatedStyle } from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type CartSummaryProps = {
  subtotal: number;
  total: number;
  discountCode: string;
  setDiscountCode: (code: string) => void;
  couponInputStyle: any;
  checkoutButtonStyle: any;
  handleCouponFocus: () => void;
  handleCouponBlur: () => void;
  handleCheckout: () => void;
};

const CartSummary = ({
  subtotal,
  total,
  discountCode,
  setDiscountCode,
  couponInputStyle,
  checkoutButtonStyle,
  handleCouponFocus,
  handleCouponBlur,
  handleCheckout,
}: CartSummaryProps) => {
  // Function to dismiss keyboard when tapping outside of TextInput
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <Animated.View
        className="bg-white rounded-t-3xl shadow-lg p-4 pt-6"
        entering={FadeInUp.delay(400).duration(500)}
      >
        {/* Discount Code */}
        <View className="flex-row items-center mb-4">
          <Animated.View style={couponInputStyle}>
            <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2">
              <Ionicons name="pricetag-outline" size={18} color="#6b7280" />
              <TextInput
                className="flex-1 ml-2 py-2"
                placeholder="Add discount code"
                value={discountCode}
                onChangeText={setDiscountCode}
                onFocus={handleCouponFocus}
                onBlur={handleCouponBlur}
                returnKeyType="done"
              />
            </View>
          </Animated.View>
          <TouchableOpacity
            className="bg-gray-100 px-3 py-2 rounded-xl ml-2"
            onPress={dismissKeyboard}
          >
            <Text className="font-medium">Apply</Text>
          </TouchableOpacity>
        </View>

        {/* Price Summary */}
        <View className="border-t border-gray-100 pt-4 mb-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500">Subtotal</Text>
            <Text className="font-medium">${subtotal.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500">Shipping</Text>
            <Text className="font-medium">Free</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Discount</Text>
            <Text className="font-medium text-green-500">$0.00</Text>
          </View>
        </View>

        {/* Total */}
        <View className="flex-row justify-between items-center mb-6 border-t border-gray-100 pt-4">
          <Text className="text-lg font-bold">Total</Text>
          <Text className="text-xl font-bold text-primary">
            ${total.toFixed(2)}
          </Text>
        </View>

        {/* Checkout Button */}
        <AnimatedTouchable
          className="bg-primary rounded-xl py-4 items-center"
          onPress={handleCheckout}
          style={checkoutButtonStyle}
        >
          <Text className="text-white font-bold text-lg">Checkout</Text>
        </AnimatedTouchable>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CartSummary;
