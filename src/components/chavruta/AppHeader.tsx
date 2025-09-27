// src/components/chavruta/AppHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../styles/design-system';
import IconButton from './IconButton';

export interface AppHeaderProps {
  title?: string;
  onNotificationPress?: () => void;
  onHelpPress?: () => void;
  onSettingsPress?: () => void;
  style?: any;
  testID?: string;
}

export default function AppHeader({
  title = 'Stender',
  onNotificationPress,
  onHelpPress,
  onSettingsPress,
  style,
  testID,
}: AppHeaderProps) {
  return (
    <View style={[styles.header, style]} testID={testID}>
      <Text style={styles.appTitle}>{title}</Text>
      <View style={styles.headerActions}>
        <IconButton
          icon="notifications-outline"
          onPress={onNotificationPress}
          testID="notification-button"
        />
        <IconButton
          icon="help-circle-outline"
          onPress={onHelpPress}
          testID="help-button"
        />
        <IconButton
          icon="settings-outline"
          onPress={onSettingsPress}
          testID="settings-button"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[3],
  },
  appTitle: {
    color: colors.text.primary,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing[2],
  },
});
