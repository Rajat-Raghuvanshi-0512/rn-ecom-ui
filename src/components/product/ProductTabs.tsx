import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

type ProductTab = 'Description' | 'Specifications' | 'Reviews';

type ProductTabsProps = {
  activeTab: ProductTab;
  onTabPress: (tab: ProductTab) => void;
  description: string;
  specifications: { label: string; value: string }[];
  tabsAnimatedStyle: any;
};

const ProductTabs = ({
  activeTab,
  onTabPress,
  description,
  specifications,
  tabsAnimatedStyle,
}: ProductTabsProps) => {
  const tabs: ProductTab[] = ['Description', 'Specifications', 'Reviews'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Description':
        return (
          <View className="py-3">
            <Text className="text-gray-700 leading-6">{description}</Text>
          </View>
        );
      case 'Specifications':
        return (
          <View className="py-3">
            {specifications.map((spec, index) => (
              <View
                key={spec.label}
                className={`flex-row py-2 ${
                  index < specifications.length - 1
                    ? 'border-b border-gray-100'
                    : ''
                }`}
              >
                <Text className="text-gray-500 w-1/3">{spec.label}</Text>
                <Text className="text-gray-800 flex-1">{spec.value}</Text>
              </View>
            ))}
          </View>
        );
      case 'Reviews':
        return (
          <View className="py-3 items-center justify-center">
            <Text className="text-gray-500">Reviews coming soon!</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Animated.View className="mt-6 px-4" style={tabsAnimatedStyle}>
      {/* Tabs */}
      <View className="flex-row border-b border-gray-200">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`mr-4 py-2 ${
              activeTab === tab ? 'border-b-2 border-primary' : ''
            }`}
            onPress={() => onTabPress(tab)}
          >
            <Text
              className={`${
                activeTab === tab
                  ? 'text-primary font-semibold'
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      {renderTabContent()}
    </Animated.View>
  );
};

export default ProductTabs;
