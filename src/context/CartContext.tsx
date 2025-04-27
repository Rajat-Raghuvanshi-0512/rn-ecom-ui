import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { productDetails } from '../utils/constants/productDetails';

// Define cart item type
export interface CartItem {
  id: number;
  quantity: number;
}

// Define cart context state
interface CartContextType {
  items: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

// Create context with default values
const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getCartItemCount: () => 0,
});

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from storage on initial load
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('@cart_items');
        if (storedCart) {
          setItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Failed to load cart from storage', error);
      }
    };

    loadCart();
  }, []);

  // Save cart to storage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('@cart_items', JSON.stringify(items));
      } catch (error) {
        console.error('Failed to save cart to storage', error);
      }
    };

    saveCart();
  }, [items]);

  // Add item to cart
  const addToCart = (productId: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);

      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prevItems, { id: productId, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear the cart
  const clearCart = () => {
    setItems([]);
  };

  // Get cart total price
  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const product = productDetails[item.id];
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  // Get total number of items in cart
  const getCartItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
