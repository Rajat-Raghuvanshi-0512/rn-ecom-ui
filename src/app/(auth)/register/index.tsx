import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, authState } = useAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (authState.isLoggedIn) {
      router.replace('/(tabs)/home');
    }
  }, [authState.isLoggedIn]);

  // Basic form validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    if (!confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      if (!agreedToTerms) {
        Alert.alert('Terms Required', 'Please agree to terms and conditions');
        return;
      }

      setIsLoading(true);
      try {
        await register(name, email, password);
        router.replace('/(tabs)/home');
      } catch (error) {
        Alert.alert(
          'Registration Failed',
          'Something went wrong. Please try again.'
        );
        console.error(error);
      } finally {
        setIsLoading(false);
      }
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
          <View className="items-center justify-center my-5">
            <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center">
              <Ionicons name="person-add" size={34} color="#7F00FF" />
            </View>
          </View>

          {/* Welcome Text */}
          <View className="px-8 mb-5">
            <Text className="text-3xl font-bold text-gray-800">
              Create Account
            </Text>
            <Text className="text-gray-500 mt-2">Sign up to get started</Text>
          </View>

          {/* Form */}
          <View className="px-8 gap-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              leftIcon="person-outline"
              error={errors.name}
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="mail-outline"
              error={errors.email}
            />

            <Input
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              leftIcon="lock-closed-outline"
              rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
              onRightIconPress={() => setShowPassword(!showPassword)}
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              leftIcon="shield-checkmark-outline"
              rightIcon={
                showConfirmPassword ? 'eye-off-outline' : 'eye-outline'
              }
              onRightIconPress={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              error={errors.confirmPassword}
            />

            {/* Terms and Conditions */}
            <View className="flex-row items-center mt-2">
              <Checkbox
                checked={agreedToTerms}
                onToggle={() => setAgreedToTerms(!agreedToTerms)}
                size={20}
              />
              <Text className="text-gray-600 text-sm flex-1 ml-3">
                By signing up, you agree to our{' '}
                <Text className="text-primary font-medium">
                  Terms of Service
                </Text>{' '}
                and{' '}
                <Text className="text-primary font-medium">Privacy Policy</Text>
              </Text>
            </View>

            {/* Register Button */}
            <View className="mt-5">
              <Button
                label="Sign Up"
                onPress={handleRegister}
                isLoading={isLoading}
                size="large"
                disabled={
                  !agreedToTerms ||
                  !name ||
                  !email ||
                  !password ||
                  !confirmPassword
                }
              />
            </View>

            {/* Social Register - Optional */}
            <View className="mt-5">
              <View className="flex-row items-center mb-4">
                <View className="flex-1 h-0.5 bg-gray-200" />
                <Text className="mx-4 text-gray-500">Or register with</Text>
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

          {/* Login Link */}
          <View className="flex-row justify-center mt-6 mb-6">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text className="text-primary font-medium">Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
