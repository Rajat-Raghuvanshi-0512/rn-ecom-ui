# Ecom UI - React Native E-commerce App

![Ecom UI Preview](https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000)

A beautiful, animated e-commerce mobile app UI built with React Native, Expo, and React Native Reanimated. This project showcases modern mobile UI design patterns with fluid animations and transitions for an engaging shopping experience.

## Features

- 🎨 **Beautiful UI Design**: Modern and clean e-commerce interface
- ✨ **Smooth Animations**: Powered by React Native Reanimated
- 🔄 **Interactive Carousels**: Product highlights with animated transitions
- 🔍 **Category Filtering**: Dynamic product filtering based on categories
- 🛍️ **Product Details**: Detailed product views with image carousels
- 🎭 **Micro-interactions**: Subtle animations for a polished user experience
- 📱 **Responsive Layout**: Works on various device sizes
- 🧩 **Component-Based Architecture**: Modular and reusable components

## Tech Stack

- [React Native](https://reactnative.dev/) - Mobile app framework
- [Expo](https://expo.dev/) - Development platform
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Animation library
- [NativeWind](https://www.nativewind.dev/) - Utility-first styling
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) - Touch handling

## Screenshots

### Home Screen

- Featured product carousel with auto-sliding animations
- Category filtering with interactive icons
- Product cards with scale animations

### Product Details Screen

- Image gallery with smooth transitions
- Color selection with interactive feedback
- Dynamic header with scroll animation
- Animated add-to-cart button

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/ecom-ui.git
   cd ecom-ui
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server

   ```bash
   npx expo start
   ```

4. Open the app on your device or emulator
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator

## Project Structure

```
src/
├── app/                   # Expo Router app directory
│   ├── (tabs)/            # Tab navigation screens
│   ├── product/           # Product details screens
│   └── index.tsx          # Entry point
├── components/            # Reusable components
│   ├── home/              # Home screen components
│   │   ├── CategoryIcons.tsx
│   │   ├── ProductSection.tsx
│   │   ├── PromoBanner.tsx
│   │   └── SearchBar.tsx
│   └── ui/                # UI components
├── screens/               # Main screen components
│   ├── HomeScreen.tsx
│   └── ProductDetailsScreen.tsx
├── assets/                # Images, fonts, etc.
└── utils/                 # Utility functions
```

## Animation Examples

### Scale Animation

```jsx
const scale = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{ scale: scale.value }],
  };
});

// In your component
<TouchableOpacity
  onPressIn={() => {
    scale.value = withSpring(0.95);
  }}
  onPressOut={() => {
    scale.value = withSpring(1);
  }}
>
  <Animated.View style={animatedStyle}>{/* Content */}</Animated.View>
</TouchableOpacity>;
```

### Entrance Animation

```jsx
<Animated.View entering={FadeInUp.duration(400).delay(index * 100)}>
  {/* Content */}
</Animated.View>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from modern e-commerce apps
- [Unsplash](https://unsplash.com/) for product images
- [Expo](https://expo.dev/) for the development framework
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) for the animation library
