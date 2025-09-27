// src/components/home/TopBar.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { spacing } from '../../styles/design-system';
import ProfileAvatar from './ProfileAvatar';

export interface TopBarProps {
  onProfilePress?: () => void;
  profileImageUri?: string;
  style?: ViewStyle;
  testID?: string;
}

export default function TopBar({
  onProfilePress,
  profileImageUri,
  style,
  testID,
}: TopBarProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <ProfileAvatar
        imageUri={profileImageUri}
        onPress={onProfilePress}
        testID="profile-avatar"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: spacing[4],
    right: spacing[4],
    zIndex: 10,
  },
});
