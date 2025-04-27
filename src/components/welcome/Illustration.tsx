import React from 'react';
import { Image, View } from 'react-native';
import illustration from '@/assets/images/illustration.png';

const Illustration: React.FC = () => {
  return (
    <View className="items-center justify-center mt-20 relative">
      <Image source={illustration} className="w-[400px] h-[300px]" />
    </View>
  );
};

export default Illustration;
