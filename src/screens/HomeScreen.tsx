import React, { useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/home/SearchBar';
import PromoBanner from '../components/home/PromoBanner';
import CategoryIcons, {
  categories,
  Category,
} from '../components/home/CategoryIcons';
import ProductSection from '../components/home/ProductSection';

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(categories[0]);

  const handleCategorySelect = (category: Category) => {
    setActiveCategory(category);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <SearchBar />
          <PromoBanner />
          <CategoryIcons
            activeCategory={activeCategory}
            onSelectCategory={handleCategorySelect}
          />
          <ProductSection
            title="Special For You"
            selectedCategory={activeCategory}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
