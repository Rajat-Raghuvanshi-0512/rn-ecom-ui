import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of our auth state
type AuthState = {
  isLoggedIn: boolean;
  userToken: string | null;
  userInfo: any;
};

// Define the shape of our context
type AuthContextType = {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const AUTH_TOKEN_KEY = '@auth_token';
const USER_INFO_KEY = '@user_info';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    userToken: null,
    userInfo: null,
  });

  // Initialize auth state by checking AsyncStorage
  const initializeAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      const userInfoStr = await AsyncStorage.getItem(USER_INFO_KEY);

      if (token && userInfoStr) {
        const userInfo = JSON.parse(userInfoStr);
        setAuthState({
          isLoggedIn: true,
          userToken: token,
          userInfo: userInfo,
        });
      }
    } catch (error) {
      console.error('Error initializing auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeAuthState();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // For now, we'll just simulate a successful login
      // In a real app, you would make an API call here
      const mockToken =
        'mock-jwt-token-' + Math.random().toString(36).substring(2);
      const mockUserInfo = {
        email,
        id: Math.random().toString(36).substring(2),
      };

      // Store token and user info in AsyncStorage
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, mockToken);
      await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(mockUserInfo));

      // Update auth state
      setAuthState({
        isLoggedIn: true,
        userToken: mockToken,
        userInfo: mockUserInfo,
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);

      // For now, we'll just simulate a successful registration
      // In a real app, you would make an API call here
      const mockToken =
        'mock-jwt-token-' + Math.random().toString(36).substring(2);
      const mockUserInfo = {
        name,
        email,
        id: Math.random().toString(36).substring(2),
      };

      // Store token and user info in AsyncStorage
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, mockToken);
      await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(mockUserInfo));

      // Update auth state
      setAuthState({
        isLoggedIn: true,
        userToken: mockToken,
        userInfo: mockUserInfo,
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);

      // Clear auth data from AsyncStorage
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      await AsyncStorage.removeItem(USER_INFO_KEY);

      // Reset auth state
      setAuthState({
        isLoggedIn: false,
        userToken: null,
        userInfo: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    authState,
    login,
    register,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
