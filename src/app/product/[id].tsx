import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import ProductDetailsScreen from '../../screens/ProductDetailsScreen';

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ProductDetailsScreen route={{ params: { productId: parseInt(id, 10) } }} />
  );
}
