import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  size?: number;
  checkColor?: string;
  borderColor?: string;
  activeBackgroundColor?: string;
}

const Checkbox = ({
  checked,
  onToggle,
  size = 20,
  checkColor = '#FFFFFF',
  borderColor = '#7F00FF',
  activeBackgroundColor = '#7F00FF',
}: CheckboxProps) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={{
        width: size,
        height: size,
        borderRadius: size / 4,
        borderWidth: 1.5,
        borderColor: checked ? activeBackgroundColor : borderColor,
        backgroundColor: checked ? activeBackgroundColor : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {checked && (
        <Ionicons name="checkmark" size={size - 6} color={checkColor} />
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;
