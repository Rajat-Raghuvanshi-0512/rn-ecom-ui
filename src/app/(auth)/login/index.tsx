import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
      Alert.alert('Login Failed', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="pt-2 px-4">
            <TouchableOpacity
              className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={22} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Logo or Image */}
          <View className="items-center justify-center mb-6">
            <Image
              source={require('../../../assets/images/login-illustration.png')}
              className="w-[300px] h-[300px]"
            />
          </View>

          {/* Welcome Text */}
          <View className="px-8 mb-6">
            <Text className="text-3xl font-bold text-gray-800 text-center">
              Welcome Back
            </Text>
            <Text className="text-gray-500 mt-2 text-center">
              Sign in to continue to your account
            </Text>
          </View>

          {/* Form */}
          <View className="px-8 gap-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="mail-outline"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              leftIcon="lock-closed-outline"
              rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
              onRightIconPress={() => setShowPassword(!showPassword)}
            />

            {/* Forgot Password */}
            <TouchableOpacity className="self-end">
              <Text className="text-primary font-medium">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <View className="mt-6">
              <Button
                label="Sign In"
                onPress={handleLogin}
                isLoading={isLoading}
                size="large"
                disabled={!email || !password}
              />
            </View>

            {/* Social Login - Optional */}
            <View className="mt-6">
              <View className="flex-row items-center mb-4">
                <View className="flex-1 h-0.5 bg-gray-200" />
                <Text className="mx-4 text-gray-500">Or continue with</Text>
                <View className="flex-1 h-0.5 bg-gray-200" />
              </View>

              <View className="flex-row justify-center space-x-4">
                <TouchableOpacity className="w-14 h-14 rounded-full bg-gray-100 items-center justify-center">
                  <Ionicons name="logo-google" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity className="w-14 h-14 rounded-full bg-gray-100 items-center justify-center">
                  <Ionicons name="logo-apple" size={24} color="#333" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Register Link */}
          <View className="flex-row justify-center mt-8 mb-6">
            <Text className="text-gray-600">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text className="text-primary font-medium">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
