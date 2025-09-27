// src/components/home/ProfileAvatar.tsx
import React from 'react';
import {
  Pressable,
  Image,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import { colors, spacing, borderRadius } from '../../styles/design-system';

export interface ProfileAvatarProps {
  imageUri?: string;
  size?: number;
  onPress?: (e: GestureResponderEvent) => void;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export default function ProfileAvatar({
  imageUri = 'https://i.pravatar.cc/100',
  size = 40,
  onPress,
  style,
  testID,
  accessibilityLabel = 'Profile avatar',
}: ProfileAvatarProps) {
  const avatarStyles = [
    styles.avatar,
    {
      width: size,
      height: size,
      borderRadius: size / 2,
    },
    style,
  ];

  return (
    <Pressable
      onPress={onPress}
      style={avatarStyles}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      <Image
        source={{ uri: imageUri }}
        style={[
          styles.image,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
        resizeMode="cover"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderColor: colors.accent.teal,
    overflow: 'hidden',
  },
  image: {
    backgroundColor: colors.neutral[200],
  },
});
