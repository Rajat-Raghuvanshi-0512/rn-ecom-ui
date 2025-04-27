import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  containerStyle?: any;
}

const Input = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  value,
  onChangeText,
  containerStyle,
  ...props
}: InputProps) => {
  return (
    <View className={`space-y-1 ${containerStyle}`}>
      <Text className="text-gray-700 font-medium m-1">{label}</Text>
      <View
        className={`flex-row border rounded-xl shadow-soft-1 p-4 bg-gray-50 items-center ${
          error ? 'border-red-500' : 'border-gray-100'
        }`}
      >
        {leftIcon && (
          <Ionicons name={leftIcon as any} size={20} color="#7F00FF" />
        )}

        <TextInput
          className="flex-1 ml-2"
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#9CA3AF"
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Ionicons name={rightIcon as any} size={20} color="#7F00FF" />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text className="text-red-500 text-xs ml-1 mt-1">{error}</Text>}
    </View>
  );
};

export default Input;
