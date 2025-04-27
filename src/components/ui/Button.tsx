import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Button = ({
  label,
  variant = 'primary',
  isLoading = false,
  fullWidth = true,
  size = 'medium',
  disabled,
  style,
  ...props
}: ButtonProps) => {
  const getBackgroundColor = () => {
    if (disabled) return 'bg-gray-300';
    switch (variant) {
      case 'primary':
        return 'bg-primary';
      case 'secondary':
        return 'bg-gray-700';
      case 'outline':
        return 'bg-transparent';
      default:
        return 'bg-primary';
    }
  };

  const getTextColor = () => {
    if (disabled) return 'text-gray-500';
    switch (variant) {
      case 'outline':
        return 'text-primary';
      default:
        return 'text-white';
    }
  };

  const getBorderStyle = () => {
    return variant === 'outline' ? 'border border-primary' : '';
  };

  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return 'py-2';
      case 'large':
        return 'py-4';
      default:
        return 'py-3';
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  const width = fullWidth ? 'w-full' : '';

  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      className={`${getBackgroundColor()} ${getBorderStyle()} ${getButtonSize()} rounded-xl items-center justify-center ${width}`}
      style={style}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === 'outline' ? '#7F00FF' : 'white'}
        />
      ) : (
        <Text className={`font-bold ${getTextColor()} ${getFontSize()}`}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
