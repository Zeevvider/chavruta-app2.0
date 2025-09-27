// src/components/common/EmptyState.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../styles/design-system';

export interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
  actionText?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export default function EmptyState({
  icon = 'document-outline',
  title,
  message,
  actionText,
  onActionPress,
  style,
  testID,
}: EmptyStateProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <Ionicons
        name={icon}
        size={64}
        color={colors.text.tertiary}
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>
      {message && (
        <Text style={styles.message}>{message}</Text>
      )}
      {actionText && onActionPress && (
        <Text style={styles.actionText} onPress={onActionPress}>
          {actionText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[6],
  },
  icon: {
    marginBottom: spacing[4],
  },
  title: {
    ...typography.styles.h4,
    color: colors.text.primary,
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  message: {
    ...typography.styles.body,
    color: colors.text.secondary,
    marginBottom: spacing[4],
    textAlign: 'center',
  },
  actionText: {
    ...typography.styles.label,
    color: colors.primary[500],
    fontWeight: typography.weights.semibold,
  },
});
