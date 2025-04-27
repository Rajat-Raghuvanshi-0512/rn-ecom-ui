import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../context/AuthContext';
import { Ionicons, Feather } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type ProfileOption = {
  id: string;
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  showArrow?: boolean;
};

// Separate component for profile option items that can use hooks
const ProfileOptionItem = ({
  option,
  index,
  baseDelay = 600,
}: {
  option: ProfileOption;
  index: number;
  baseDelay?: number;
}) => {
  const scaleValue = useSharedValue(1);

  const handlePressIn = () => {
    scaleValue.value = withTiming(0.98, { duration: 100 });
  };

  const handlePressOut = () => {
    scaleValue.value = withTiming(1, { duration: 100 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
    };
  });

  return (
    <AnimatedTouchable
      key={option.id}
      className="flex-row items-center py-3.5 px-4"
      onPress={option.onPress}
      activeOpacity={0.7}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
      entering={FadeInRight.delay(index * 100 + baseDelay).duration(400)}
      layout={LinearTransition.springify()}
    >
      <View className="w-8 h-8 rounded-full justify-center items-center mr-3">
        {option.icon}
      </View>
      <Text className="flex-1 text-base">{option.title}</Text>
      {option.showArrow && (
        <Feather name="chevron-right" size={20} color="#C4C4C4" />
      )}
    </AnimatedTouchable>
  );
};

export default function ProfileScreen() {
  const { authState, logout } = useAuth();

  // Get user information
  const userEmail = authState.userInfo?.email ?? 'jackfrost@gmail.com';
  const userName = authState.userInfo?.name ?? 'Jack Frost';

  // Profile image - use a default if none exists
  const profileImage =
    authState.userInfo?.profileImage ??
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

  // Animation values
  const profileImageScale = useSharedValue(0.8);
  const profileInfoOpacity = useSharedValue(0);

  // Initialize animations
  useEffect(() => {
    profileImageScale.value = withDelay(300, withSpring(1, { damping: 12 }));
    profileInfoOpacity.value = withDelay(500, withTiming(1, { duration: 800 }));
  }, []);

  // Animated styles
  const profileImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: profileImageScale.value }],
    };
  });

  const profileInfoStyle = useAnimatedStyle(() => {
    return {
      opacity: profileInfoOpacity.value,
      transform: [
        { translateY: withTiming(10 * (1 - profileInfoOpacity.value)) },
      ],
    };
  });

  // Handle logout
  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        onPress: () => logout(),
        style: 'destructive',
      },
    ]);
  };

  // Main profile options
  const mainOptions: ProfileOption[] = [
    {
      id: 'edit-profile',
      title: 'Edit profile',
      icon: <Ionicons name="person" size={20} color="#FE7B7C" />,
      onPress: () =>
        Alert.alert(
          'Edit Profile',
          'Edit profile functionality will be implemented here'
        ),
      showArrow: true,
    },
    {
      id: 'stats',
      title: 'My stats',
      icon: <Ionicons name="bar-chart" size={20} color="#7F50F6" />,
      onPress: () =>
        Alert.alert('My Stats', 'Stats functionality will be implemented here'),
      showArrow: true,
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Ionicons name="settings-outline" size={20} color="#FF9836" />,
      onPress: () =>
        Alert.alert(
          'Settings',
          'Settings functionality will be implemented here'
        ),
      showArrow: true,
    },
    {
      id: 'invite',
      title: 'Invite a friend',
      icon: <Ionicons name="people" size={20} color="#8661C1" />,
      onPress: () =>
        Alert.alert(
          'Invite Friend',
          'Invitation functionality will be implemented here'
        ),
      showArrow: true,
    },
  ];

  // Secondary profile options
  const secondaryOptions: ProfileOption[] = [
    {
      id: 'help',
      title: 'Help',
      icon: <Ionicons name="help-circle-outline" size={20} color="#7C7C7C" />,
      onPress: () =>
        Alert.alert(
          'Help',
          'Help and support functionality will be implemented here'
        ),
      showArrow: true,
    },
    {
      id: 'logout',
      title: 'Log out',
      icon: <Feather name="log-out" size={20} color="#7C7C7C" />,
      onPress: handleLogout,
      showArrow: true,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Header */}
      <Animated.View
        className="pt-2 pb-6 items-center"
        entering={FadeInDown.duration(600)}
      >
        <View className="absolute right-4 top-2">
          <TouchableOpacity>
            <Ionicons name="camera-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <View className="items-center">
          <Animated.View
            className="w-24 h-24 rounded-full border-2 border-primary p-1 my-3"
            style={profileImageStyle}
          >
            <Image
              source={{ uri: profileImage }}
              className="w-full h-full rounded-full"
            />
          </Animated.View>
          <Animated.View style={profileInfoStyle}>
            <Text className="text-xl font-bold">{userName}</Text>
            <Text className="text-gray-500 mt-1 text-center">{userEmail}</Text>
          </Animated.View>
        </View>
      </Animated.View>

      <ScrollView className="flex-1">
        {/* Main Options */}
        <Animated.View
          className="mx-4 bg-gray-50 rounded-2xl overflow-hidden mb-4"
          entering={FadeInUp.delay(300).duration(500)}
        >
          {mainOptions.map((option, index) => (
            <ProfileOptionItem key={option.id} option={option} index={index} />
          ))}
        </Animated.View>

        {/* Secondary Options */}
        <Animated.View
          className="mx-4 bg-gray-50 rounded-2xl overflow-hidden mb-8"
          entering={FadeInUp.delay(500).duration(500)}
        >
          {secondaryOptions.map((option, index) => (
            <ProfileOptionItem
              key={option.id}
              option={option}
              index={index}
              baseDelay={1000}
            />
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
