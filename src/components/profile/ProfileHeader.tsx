import React from 'react';
import { View, Text, Image } from 'react-native';
import Animated from 'react-native-reanimated';

type ProfileHeaderProps = {
  userName: string;
  userEmail: string;
  profileImage: string;
  profileImageStyle: any;
  profileInfoStyle: any;
};

const ProfileHeader = ({
  userName,
  userEmail,
  profileImage,
  profileImageStyle,
  profileInfoStyle,
}: ProfileHeaderProps) => {
  return (
    <View className="items-center pt-6 pb-8">
      <Animated.View
        style={profileImageStyle}
        className="overflow-hidden rounded-full"
      >
        <Image
          source={{ uri: profileImage }}
          className="w-24 h-24 rounded-full"
          resizeMode="cover"
        />
      </Animated.View>

      <Animated.View className="items-center mt-4" style={profileInfoStyle}>
        <Text className="text-xl font-bold">{userName}</Text>
        <Text className="text-gray-500 mt-1">{userEmail}</Text>
      </Animated.View>
    </View>
  );
};

export default ProfileHeader;
