import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import ProductDetailsScreen from '../../screens/product/ProductDetailsScreen';
import { productDetails } from '../../utils/constants/productDetails';

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const numericId = parseInt(id, 10);

  // Validate that the product exists
  if (!productDetails[numericId]) {
    console.warn(`Product with ID ${numericId} not found`);
  }

  return <ProductDetailsScreen route={{ params: { productId: numericId } }} />;
}
