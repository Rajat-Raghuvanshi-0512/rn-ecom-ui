import React from 'react';
import { View, TouchableOpacity, Animated as RNAnimated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ProductHeaderProps = {
  scrollY: RNAnimated.Value;
  onToggleFavorite: () => void;
  isProductFavorite: boolean;
};

const ProductHeader = ({
  scrollY,
  onToggleFavorite,
  isProductFavorite,
}: ProductHeaderProps) => {
  const router = useRouter();
  const safeArea = useSafeAreaInsets();

  // Animation for header background
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

  return (
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
      <TouchableOpacity
        onPress={() => router.back()}
        className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
      >
        <Feather name="chevron-left" size={24} color="#000" />
      </TouchableOpacity>

      <View className="flex-row">
        <TouchableOpacity className="w-10 h-10 rounded-full bg-white items-center justify-center mr-2 shadow-sm">
          <Feather name="share-2" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
          onPress={onToggleFavorite}
        >
          <Feather
            name="heart"
            size={20}
            color={isProductFavorite ? '#7F00FF' : '#000'}
          />
        </TouchableOpacity>
      </View>
    </RNAnimated.View>
  );
};

export default ProductHeader;
