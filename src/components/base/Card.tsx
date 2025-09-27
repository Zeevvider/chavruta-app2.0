// src/components/base/Card.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Pressable,
  GestureResponderEvent,
} from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../styles/design-system';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  onPress?: (e: GestureResponderEvent) => void;
  style?: ViewStyle;
  padding?: keyof typeof spacing;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityRole?: string;
}

export default function Card({
  children,
  variant = 'default',
  onPress,
  style,
  padding = 4,
  testID,
  accessibilityLabel,
  accessibilityRole = 'none',
}: CardProps) {
  const cardStyles = [
    styles.base,
    styles[variant],
    { padding: spacing[padding] },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          cardStyles,
          pressed && styles.pressed,
        ]}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole as any}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={cardStyles} testID={testID}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background.card,
  },
  
  // Variants
  default: {
    // No additional styles
  },
  elevated: {
    ...shadows.md,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  filled: {
    backgroundColor: colors.background.tertiary,
  },
  
  // States
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
});
