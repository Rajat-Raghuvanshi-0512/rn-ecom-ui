import { View, SafeAreaView, ScrollView, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../context/AuthContext';
import { Ionicons, Feather } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

// Import components
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileOptionsList, {
  ProfileOption,
} from '../../components/profile/ProfileOptionsList';

const ProfileScreen = () => {
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
  const containerOpacity = useSharedValue(0);

  // Initialize animations
  useEffect(() => {
    // Start with container opacity animation first
    containerOpacity.value = withTiming(1, { duration: 300 });

    // Then trigger profile image and info animations
    profileImageScale.value = withDelay(
      300,
      withSpring(1, { damping: 12, stiffness: 100 })
    );
    profileInfoOpacity.value = withDelay(500, withTiming(1, { duration: 600 }));
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
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />

      <ScrollView className="flex-1">
        <Animated.View entering={FadeInDown.duration(600).springify()}>
          {/* Profile Header */}
          <ProfileHeader
            userName={userName}
            userEmail={userEmail}
            profileImage={profileImage}
            profileImageStyle={profileImageStyle}
            profileInfoStyle={profileInfoStyle}
          />

          {/* Profile Options */}
          <View className="px-4">
            <ProfileOptionsList options={mainOptions} baseDelay={600} />

            <ProfileOptionsList
              title="Support"
              options={secondaryOptions}
              baseDelay={800}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
