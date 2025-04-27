import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define favorites context state
interface FavoritesContextType {
  favorites: number[];
  addToFavorites: (productId: number) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
}

// Create context with default values
const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
  clearFavorites: () => {},
});

// Provider component
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Load favorites from storage on initial load
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('@favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Failed to load favorites from storage', error);
      }
    };

    loadFavorites();
  }, []);

  // Save favorites to storage whenever it changes
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('@favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites to storage', error);
      }
    };

    saveFavorites();
  }, [favorites]);

  // Add product to favorites
  const addToFavorites = (productId: number) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites;
      }
      return [...prevFavorites, productId];
    });
  };

  // Remove product from favorites
  const removeFromFavorites = (productId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((id) => id !== productId)
    );
  };

  // Check if product is in favorites
  const isFavorite = (productId: number) => {
    return favorites.includes(productId);
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use favorites context
export const useFavorites = () => useContext(FavoritesContext);
