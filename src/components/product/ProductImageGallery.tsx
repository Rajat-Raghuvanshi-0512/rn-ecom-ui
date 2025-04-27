import React, { useRef } from 'react';
import {
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

type ProductImageGalleryProps = {
  images: string[];
  activeImageIndex: number;
  onImageChange: (index: number) => void;
  imageAnimatedStyle: any;
};

const ProductImageGallery = ({
  images,
  activeImageIndex,
  onImageChange,
  imageAnimatedStyle,
}: ProductImageGalleryProps) => {
  const flatListRef = useRef<FlatList>(null);

  const renderImageItem = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => (
    <View
      style={{
        width,
        height: 400,
        backgroundColor: '#f9f9f9',
      }}
    >
      <View style={{ height: '100%' }}>
        <Animated.View
          style={[imageAnimatedStyle, { height: '100%' }]}
          entering={ZoomIn.duration(400)}
        >
          <Image
            source={{ uri: item }}
            style={{ width, height: 400 }}
            resizeMode="cover"
          />
        </Animated.View>
      </View>
    </View>
  );

  const handleScrollEnd = (e: any) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    if (pageNum !== activeImageIndex) {
      onImageChange(pageNum);
    }
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderImageItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        initialScrollIndex={activeImageIndex}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* Image Indicators */}
      <View className="flex-row justify-center mt-4">
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === activeImageIndex ? 'bg-primary w-4' : 'bg-gray-300'
            }`}
            onPress={() => onImageChange(index)}
          />
        ))}
      </View>
    </View>
  );
};

export default ProductImageGallery;
