// src/components/common/LoadingSpinner.tsx
import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing } from '../../styles/design-system';

export interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  style?: ViewStyle;
  testID?: string;
}

export default function LoadingSpinner({
  size = 'large',
  color = colors.primary[500],
  message,
  style,
  testID,
}: LoadingSpinnerProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text style={styles.message}>{message}</Text>
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
  message: {
    ...typography.styles.body,
    color: colors.text.secondary,
    marginTop: spacing[3],
    textAlign: 'center',
  },
});
